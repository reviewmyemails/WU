import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 12; // "Waiting List Vercel"
const FREE_CREDITS = 5000;
const CONTACT_REQUEST_EMAIL = 'yt+quizsos@reviewmyemails.com';

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function addToBrevo(email, source, attributes = {}) {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      email: email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: {
        SOURCE: source,
        SIGNUP_DATE: new Date().toISOString(),
        ...attributes
      }
    })
  });
  return response;
}

async function sendContactRequestEmail(userEmail, quizType, result, answers, answerData, sectionScores, overallScore) {
  // Format the quiz answers for the email
  let answerSummary = '';

  if (quizType === 'self-audit' && sectionScores) {
    // For audit quiz, show section scores
    answerSummary = 'Section Scores:\n' + Object.entries(sectionScores)
      .map(([section, score]) => `- ${section}: ${score}%`)
      .join('\n');
    answerSummary += `\n\nOverall Score: ${overallScore}%`;
  } else if (answerData) {
    // For risk assessment quiz
    answerSummary = Object.entries(answerData)
      .map(([q, data]) => `Q${q}: ${data.short} - "${data.context}"`)
      .join('\n');
  }

  const emailBody = `
New Quiz Contact Request

Email: ${userEmail}
Quiz Type: ${quizType}
Result: ${result}

${answerSummary}

Raw answers: ${JSON.stringify(answers)}

This person requested someone reach out to discuss their situation.
`;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { email: 'notifications@reviewmyemails.com', name: 'Quiz Notifications' },
      to: [{ email: CONTACT_REQUEST_EMAIL }],
      replyTo: { email: userEmail },
      subject: `Quiz Contact Request: ${result} - ${userEmail}`,
      textContent: emailBody
    })
  });
  return response;
}

// Send results email to the user
async function sendResultsEmail(userEmail, quizType, result, answers, answerData, sectionScores, overallScore, subscribeNewsletter) {
  const isAudit = quizType === 'self-audit';
  const credits = subscribeNewsletter ? FREE_CREDITS : 0;

  // Build the email HTML
  let resultsHtml = '';

  if (isAudit && sectionScores) {
    // Audit quiz results
    const grade = overallScore >= 80 ? 'Strong Foundation' : overallScore >= 60 ? 'Needs Attention' : 'High Risk';
    const gradeColor = overallScore >= 80 ? '#16a34a' : overallScore >= 60 ? '#d97706' : '#dc2626';

    resultsHtml = `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 48px; font-weight: 700; color: #134e4a;">${overallScore}</div>
        <div style="font-size: 14px; color: #64748b;">out of 100</div>
        <div style="display: inline-block; padding: 8px 20px; border-radius: 100px; font-size: 15px; font-weight: 600; background: ${gradeColor}20; color: ${gradeColor}; margin-top: 12px;">${grade}</div>
      </div>

      <div style="background: #f8fafa; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <div style="font-size: 14px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 12px;">Score by Section</div>
        ${Object.entries(sectionScores).map(([section, score]) => {
          const fillColor = score >= 80 ? '#16a34a' : score >= 60 ? '#d97706' : '#dc2626';
          return `
            <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="flex: 1; font-size: 14px;">${section}</span>
              <div style="width: 80px; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                <div style="width: ${score}%; height: 100%; background: ${fillColor}; border-radius: 4px;"></div>
              </div>
              <span style="font-size: 14px; font-weight: 600; color: ${fillColor}; width: 40px; text-align: right;">${score}%</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (answerData) {
    // Risk assessment quiz results
    const resultLabels = {
      'no-consent': 'Higher Risk - No Consent List',
      'crisis': 'Critical - ESP Crisis',
      'tool-failure': 'High Risk - Validation Gap',
      'infra': 'High Risk - Infrastructure Issue',
      'catchall': 'Medium Risk - Catch-All Domains',
      'decay': 'Medium Risk - List Decay',
      'preventive': 'Low Risk - Preventive Check'
    };

    resultsHtml = `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; padding: 8px 20px; border-radius: 100px; font-size: 15px; font-weight: 600; background: #134e4a; color: white;">${resultLabels[result] || result}</div>
      </div>

      <div style="background: #f8fafa; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <div style="font-size: 14px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 12px;">Your Answers</div>
        ${Object.entries(answerData).map(([q, data]) => `
          <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <div style="font-size: 14px; font-weight: 600;">${data.short}</div>
            <div style="font-size: 13px; color: #64748b; font-style: italic;">"${data.context}"</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f0fdfa; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="https://reviewmyemails.com/svg/Horizontal-Logo.svg" alt="Review My Emails" height="50" style="height: 50px;">
    </div>

    <!-- Main Card -->
    <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
      <h1 style="font-size: 24px; font-weight: 700; color: #134e4a; margin: 0 0 8px 0; text-align: center;">
        Your ${isAudit ? 'Audit' : 'Quiz'} Results
      </h1>
      <p style="font-size: 15px; color: #64748b; margin: 0 0 24px 0; text-align: center;">
        Here's a summary of your ${isAudit ? 'self-audit' : 'risk assessment'} results.
      </p>

      ${resultsHtml}

      ${credits > 0 ? `
      <div style="background: #f0fdfa; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <div style="font-size: 14px; color: #0d9488; font-weight: 600;">You've earned ${credits.toLocaleString()} free credits!</div>
        <div style="font-size: 13px; color: #64748b;">These will be applied when self-serve launches.</div>
      </div>
      ` : ''}

      <!-- CTA -->
      <div style="text-align: center; margin-top: 24px;">
        <a href="https://reviewmyemails.com/sos-hotline" style="display: inline-block; background: #0d9488; color: white; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 15px;">Talk to a Specialist</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; font-size: 13px; color: #64748b;">
      <p style="margin: 0 0 8px 0;">Questions? Reply to this email or visit <a href="https://reviewmyemails.com/sos-hotline" style="color: #0d9488;">our SOS Hotline</a>.</p>
      <p style="margin: 0;">Review My Emails · Expert list cleaning, not just validation.</p>
    </div>
  </div>
</body>
</html>
`;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { email: 'results@reviewmyemails.com', name: 'Review My Emails' },
      to: [{ email: userEmail }],
      replyTo: { email: 'sos@reviewmyemails.com' },
      subject: `Your ${isAudit ? 'Audit' : 'Quiz'} Results from Review My Emails`,
      htmlContent: htmlContent
    })
  });
  return response;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      quizType,
      result,
      overallScore,
      sectionScores,
      answers,
      answerData,
      subscribeNewsletter,
      joinWaitlist,
      requestContact,
      source
    } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Connect to MongoDB
    const client = await getMongoClient();
    const db = client.db('rme');

    // Save quiz results
    const quizResultsCollection = db.collection('quiz_results');
    const quizResult = {
      email: normalizedEmail,
      quizType: quizType,
      result: result,
      overallScore: overallScore || null,
      sectionScores: sectionScores || null,
      answers: answers || {},
      answerData: answerData || {},
      subscribeNewsletter: subscribeNewsletter || false,
      joinWaitlist: joinWaitlist || false,
      requestContact: requestContact || false,
      source: source || 'quiz',
      createdAt: new Date()
    };

    await quizResultsCollection.insertOne(quizResult);

    // If requesting contact, save to contact_requests collection and send email
    if (requestContact) {
      const contactRequestsCollection = db.collection('quiz_contact_requests');
      await contactRequestsCollection.insertOne({
        email: normalizedEmail,
        quizType: quizType,
        result: result,
        overallScore: overallScore || null,
        sectionScores: sectionScores || null,
        answers: answers || {},
        answerData: answerData || {},
        status: 'pending',
        createdAt: new Date()
      });

      // Send notification email to YT
      try {
        await sendContactRequestEmail(normalizedEmail, quizType, result, answers, answerData, sectionScores, overallScore);
      } catch (emailError) {
        console.error('Contact request email error:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    // Send results email to the user
    try {
      await sendResultsEmail(normalizedEmail, quizType, result, answers, answerData, sectionScores, overallScore, subscribeNewsletter);
    } catch (emailError) {
      console.error('Results email error:', emailError);
      // Don't fail the whole request if email fails
    }

    // If joining waitlist, add to waitlist collection
    if (joinWaitlist) {
      const waitlistCollection = db.collection('waitlist');
      const existingWaitlist = await waitlistCollection.findOne({ email: normalizedEmail });

      if (!existingWaitlist) {
        await waitlistCollection.insertOne({
          email: normalizedEmail,
          freeCredits: subscribeNewsletter ? FREE_CREDITS : 0,
          subscribeNewsletter: subscribeNewsletter || false,
          source: source || 'quiz',
          quizType: quizType,
          createdAt: new Date(),
          status: 'pending'
        });
      } else if (subscribeNewsletter && !existingWaitlist.subscribeNewsletter) {
        // If they weren't subscribed before but are now, add credits
        await waitlistCollection.updateOne(
          { email: normalizedEmail },
          {
            $set: {
              subscribeNewsletter: true,
              freeCredits: FREE_CREDITS,
              updatedAt: new Date()
            }
          }
        );
      }
    }

    // Add to Brevo if subscribed to newsletter
    if (subscribeNewsletter) {
      try {
        await addToBrevo(normalizedEmail, source || 'quiz', {
          QUIZ_TYPE: quizType,
          QUIZ_RESULT: result
        });
      } catch (brevoError) {
        console.error('Brevo error:', brevoError);
        // Don't fail the whole request if Brevo fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz results saved',
      credits: subscribeNewsletter ? FREE_CREDITS : 0
    });

  } catch (error) {
    console.error('Quiz results error:', error);
    return res.status(500).json({
      error: 'Failed to save quiz results',
      details: error.message
    });
  }
}
