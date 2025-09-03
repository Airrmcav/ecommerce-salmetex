import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, apellido, email, telefono, mensaje } = body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !email || !telefono || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email', // Servidor SMTP de Titan Email (Hostinger)
      port: 465,
      secure: true,
      auth: {
        user: 'contacto@salmetexmed.com.mx',
        pass: process.env.EMAIL_PASSWORD, // Usar variable de entorno para la contraseña
      },
      tls: {
        rejectUnauthorized: false // Solución para problemas de certificados
      }
    });

    // Configurar el correo
    const mailOptions = {
      from: 'contacto@salmetexmed.com.mx',
      to: 'contacto@salmetexmed.com.mx',
      subject: 'Cotización',
      html: `
        <h1>Nueva solicitud de cotización</h1>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { success: false, message: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}