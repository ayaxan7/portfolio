import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to you (site owner)
    const mailOptionsToOwner = {
      from: process.env.EMAIL_USER,
      to: 'syedayaan9376@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a0a0a; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="padding: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #0a0a0a;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #737373; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    // Auto-reply to the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a0a0a; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
            Thank You for Your Message
          </h2>
          <div style="padding: 20px 0;">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of your message:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #0a0a0a; margin: 20px 0;">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p>Best regards,<br><strong>Syed Mohammad Ayaan</strong></p>
          </div>
          <div style="border-top: 1px solid #e5e5e5; padding-top: 15px; margin-top: 20px;">
            <p style="color: #737373; font-size: 12px;">
              Android Developer | Full Stack Mobile Developer<br>
              <a href="https://github.com/ayaxan7" style="color: #0a0a0a;">GitHub</a> |
              <a href="https://linkedin.com/in/ayaan" style="color: #0a0a0a;">LinkedIn</a> |
              <a href="https://medium.com/@syedayaan9376" style="color: #0a0a0a;">Medium</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner);
    await transporter.sendMail(mailOptionsToSender);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
