import nodemailer from 'nodemailer';

// Email transporter configuration
export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email templates
export const emailTemplates = {
  emailVerification: (verificationUrl: string, locale: string = 'fr') => {
    const templates = {
      fr: {
        subject: 'Vérifiez votre adresse email',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0ea5e9;">Vérifiez votre adresse email</h1>
            <p>Merci de vous être inscrit ! Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p>
            <a href="${verificationUrl}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Vérifier mon email</a>
            <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
            <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
            <p style="color: #666; font-size: 14px;">Ce lien expire dans 24 heures.</p>
          </div>
        `,
      },
      en: {
        subject: 'Verify your email address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0ea5e9;">Verify your email address</h1>
            <p>Thanks for signing up! Click the link below to verify your email address:</p>
            <a href="${verificationUrl}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Verify my email</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
            <p style="color: #666; font-size: 14px;">This link expires in 24 hours.</p>
          </div>
        `,
      },
    };
    return templates[locale as keyof typeof templates] || templates.en;
  },

  passwordReset: (resetUrl: string, locale: string = 'fr') => {
    const templates = {
      fr: {
        subject: 'Réinitialisation de votre mot de passe',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0ea5e9;">Réinitialisation de votre mot de passe</h1>
            <p>Vous avez demandé une réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous :</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Réinitialiser mon mot de passe</a>
            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
            <p style="color: #666; font-size: 14px;">Ce lien expire dans 1 heure.</p>
          </div>
        `,
      },
      en: {
        subject: 'Reset your password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0ea5e9;">Reset your password</h1>
            <p>You requested a password reset. Click the link below:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset my password</a>
            <p>If you didn't request this reset, please ignore this email.</p>
            <p style="color: #666; font-size: 14px;">This link expires in 1 hour.</p>
          </div>
        `,
      },
    };
    return templates[locale as keyof typeof templates] || templates.en;
  },

  welcomeEmail: (name: string, locale: string = 'fr') => {
    const templates = {
      fr: {
        subject: 'Bienvenue sur notre plateforme !',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0ea5e9;">Bienvenue ${name} !</h1>
            <p>Votre compte a été créé avec succès. Vous pouvez maintenant explorer toutes les fonctionnalités de notre plateforme.</p>
            <p>Commencez par :</p>
            <ul>
              <li>Compléter votre profil</li>
              <li>Explorer nos articles de blog</li>
              <li>Découvrir nos services et formations</li>
            </ul>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Bonne découverte !</p>
          </div>
        `,
      },
      en: {
        subject: 'Welcome to our platform!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0ea5e9;">Welcome ${name}!</h1>
            <p>Your account has been successfully created. You can now explore all the features of our platform.</p>
            <p>Start by:</p>
            <ul>
              <li>Completing your profile</li>
              <li>Exploring our blog articles</li>
              <li>Discovering our services and training</li>
            </ul>
            <p>If you have any questions, don't hesitate to contact us.</p>
            <p>Happy exploring!</p>
          </div>
        `,
      },
    };
    return templates[locale as keyof typeof templates] || templates.en;
  },
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  from?: string
) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: from || process.env.FROM_EMAIL,
    to,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};