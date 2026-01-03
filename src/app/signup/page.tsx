import { Suspense } from "react";
import Signup from "@/features/signup";

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signup />
    </Suspense>
  );
}
