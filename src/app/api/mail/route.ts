import mail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";
mail.setApiKey(process.env.SENDGRID_KEY!);

export async function POST(req: NextRequest) {
  console.log("📪 POST");

  const body: any = await req.json();

  const { email, subject, mailBody } = body;

  console.log(body);

  const msg: any = {
    to: email,
    from: "nicolas.rocagel@gmail.com",
    subject,
    content: [{ type: "text/html", value: mailBody }],
  };
  console.log("email sending");

  mail.send(msg).then(
    () => {
      console.log("email sent! 🚀");
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
