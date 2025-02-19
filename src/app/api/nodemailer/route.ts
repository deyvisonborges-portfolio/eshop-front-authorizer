// Vide: https://medium.com/@python-javascript-php-html-css/overcoming-nodemailer-no-recipients-defined-error-in-node-js-7db2131bbd48
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const from = process.env.NODEMAILER_EMAIL;
const pass = process.env.NODEMAILER_PASS;

export async function POST() {
  const smtp = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      // https://myaccount.google.com/apppasswords
      pass, // Criar um senha para esse App na conta gmail
      user: from, // Email do Gmail
    },
  });

  const emailConfig = {
    from: from,
    to: "otheremail or sameemail",
    subject: "Teste",
    html: "<h1>Cadastro realizado com sucesso</h1>",
  };

  const result = await smtp.sendMail(emailConfig);

  if (result.rejected) {
    return NextResponse.json({
      status: 500,
      error: "Email não enviado",
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Email enviado com sucesso",
  });
}
