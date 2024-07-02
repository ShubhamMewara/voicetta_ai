import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogInButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="max-w-48 space-y-3">
        <Button onClick={() => signOut()}>Sign out</Button>
        <Button className="overflow-hidden text-ellipsis ml-1 bg-[#183534] hover:bg-[#183534] p-3 rounded-lg shadow-sm ">{session.user?.name}</Button>
      </div>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
