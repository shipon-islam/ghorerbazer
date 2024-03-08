import Link from "next/link";
import SignupForm from "./SignupForm";

export default function page() {
  return (
    <div>
      <SignupForm />
      <Link href="/login">login</Link>
    </div>
  );
}
