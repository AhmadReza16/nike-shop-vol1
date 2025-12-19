import AuthForm from "@/components/AuthForm";
import { signIn } from "@/lib/auth/actionsNew";

export default function Page() {
  return <AuthForm mode="sign-in" onSubmit={signIn} />;
}
