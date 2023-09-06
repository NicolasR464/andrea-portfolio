"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [email, setMail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [mailBody, setMailBody] = useState<string>("");
  const [isPosting, setPosting] = useState<boolean>(false);

  const handleSend = async () => {
    setPosting(true);

    const form = {
      email,
      subject,
      mailBody,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(form),
    };

    try {
      const mail = await fetch("/api/mail", config);

      const mailParsed = await mail.json();

      if (mail.status == 200) {
        setMail("");
        setSubject("");
        setMailBody("");

        toast.success("email sent! 📮");
      } else {
        toast.error("something went wront, please try again.");
      }
    } catch (err) {
      console.log(err);
    }

    setPosting(false);
  };

  return (
    <div className="flex w-screen justify-center flex-col items-center text-5xl translate-y-24">
      <h1 className="">contact</h1>
      <div className="flex  justify-center items-center card  transition duration-1000 tablet:hover:scale-105 m-5  tablet:max-w-2xl bg-base-100 shadow-lg min-w-[350px] tablet:hover:shadow-xl tablet:w-[480px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Your email address?"
          className="input input-bordered w-96 max-w-[95vw] max-w-md m-2"
          required
        />
        <input
          className="input input-bordered w-96 max-w-[95vw] max-w-md m-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Your email subject?"
        />
        <textarea
          className="textarea w-full max-w-md max-w-[95vw] textarea-bordered w-96"
          required
          rows={3}
          value={mailBody}
          onChange={(e) => setMailBody(e.target.value)}
          placeholder="write to me here ✨"
        ></textarea>

        <button
          onClick={handleSend}
          className="btn btn-outline m-2"
          disabled={isPosting}
        >
          {isPosting ? (
            <span className="text-center text-neutral-600	  flex items-center">
              SENDING<span className="loading loading-ring loading-sm"></span>
            </span>
          ) : (
            <span className="text-center">SEND</span>
          )}
        </button>
      </div>
    </div>
  );
}
