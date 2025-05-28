/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
"use server";
import sgMail from '@sendgrid/mail';
import { sendContactEmailActionProps } from '~/common/types/types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);



export async function sendContactEmail(
  prevState: sendContactEmailActionProps,
  formData: FormData
): Promise<sendContactEmailActionProps> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;


  if (!name || !email || !message) {
    return {
      status: 'error',
      message: 'All fields are required.',
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
    };
  }


  const msg: sgMail.MailDataRequired = {
    to: process.env.SENDGRID_TO_EMAIL! || process.env.SENDGRID_FROM_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `New Portfolio Contact from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };


  try {
    await sgMail.send(msg);
    console.log('Email sent successfully via Server Action');

    return {
      status: 'success',
      message: 'Your message has been sent successfully!',
    };
  } catch (error: unknown) {
    let errorMessage = "Sorry, your message couldn't be sent right now. Please try again later or contact me through my social links.";

    if (error && typeof error === 'object' && 'response' in error) {
      const sendGridError = error as { response?: { body?: any } };
      if (sendGridError.response && sendGridError.response.body) {
        console.error('SendGrid API Error Details:', sendGridError.response.body);
      }
    } else {
      console.error('Unexpected error sending email:', error);
    }

    return {
      status: 'error',
      message: errorMessage,
    };
  }
}
