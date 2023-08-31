import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center translate-y-24">
      <SignIn />
    </div>
  );
}
