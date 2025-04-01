import { getCurrentSession, registerUser } from "@/actions/auth";
import SignUp from "@/components/auth/SignUp";

import { redirect } from "next/navigation";
import { z } from "zod";

const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();
export default async function SignUpPage() {
  const { user } = await getCurrentSession();
  if (user) {
    // Redirect to home page if user is already logged in
    return redirect("/");
  }
  const action = async (prevState: unknown, formData: FormData) => {
    "use server";
    const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }
    const { email, password } = parsed.data;
    const { user, error } = await registerUser(email, password);
    if (error) {
      return { message: error };
    } else if (user) {
      return redirect("/sign-in");
    }
  };
  return <SignUp action={action} />;
}
