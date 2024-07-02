"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChromeIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  async function signInWithGoogle() {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }
  async function signInWithCredentials() {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: email,
        email,
        password,
      });
      if (result?.error) {
        router.push("/support");
      }
    } catch (error) {
      console.error("Error signing in with credentials:", error);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center mx-4 text-white">
      <Card className="flex flex-col justify-between w-full max-w-md space-y-6 p-6 md:p-8 bg-[#0e0e0e] bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10">
        <div className="space-y-2 text-center text-white">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="">Sign in to your account to continue.</p>
        </div>
        {!session.data && (
          <div className="space-y-3">
            <div className="space-y-2 text-white">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 text-white">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full text-ellipsis bg-[#183534] hover:bg-[#183534] p-3 rounded-lg shadow-sm gap-4"
              onClick={signInWithCredentials}
            >
              Sign in
            </Button>
          </div>
        )}
        {session.data && (
          <Button
            className="w-full overflow-hidden text-ellipsis ml-1 bg-[#183534] hover:bg-[#183534] p-3 rounded-lg shadow-sm"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <span className="mr-2">Continue as</span>
            <span className="text-[#63beb7]">{session.data.user?.name}</span>
          </Button>
        )}
      </Card>
    </div>
  );
};

export default SignIn;
