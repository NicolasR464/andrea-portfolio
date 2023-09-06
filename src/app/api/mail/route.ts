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
      { type: "text/html", value: mailBody + "<br>my email: " + email },
    ],
  };

  mail.send(msg).then(
    () => {
      return NextResponse.json({ res: "email sent" }, { status: 200 });
    },
    (error: any) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
        return NextResponse.json({ data: "Email couldn't go through...." });
      }
    }
  );
  return NextResponse.json({ res: "email sent" }, { status: 200 });
}
