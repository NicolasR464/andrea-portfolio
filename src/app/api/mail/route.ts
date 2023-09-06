import mail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";
mail.setApiKey(process.env.SENDGRID_KEY!);

export async function POST(req: NextRequest) {
  const body: any = await req.json();

  const { email, subject, mailBody } = body;

  const msg: any = {
    to: process.env.HOST_EMAIL,
    from: process.env.WEBSITE_EMAIL,
    subject,
    content: [
      { type: "text/html", value: mailBody + "<br>mon email: " + email },
    ],
  };

  const mailMsg = await mail.send(msg).then(
    () => {
      return 200;
    },
    (error: any) => {
      console.error(error);
      return 400;
    }
  );

  return NextResponse.json(
    { res: mailMsg === 200 ? "email sent" : "email error" },
    { status: mailMsg }
  );
}
