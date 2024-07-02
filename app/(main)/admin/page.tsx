"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/lib/actions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [multiFactor, setMultiFactor] = useState("");
  const toast = useToast();

  async function signInWithCredentials() {
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      publicKey.length === 0 ||
      privateKey.length === 0
    ) {
      toast.toast({
        title: "Please fill out all fields",
      });
      return;
    }
    try {
      await createUser({
        name,
        email,
        password,
        public_key: publicKey,
        private_key: privateKey,
        multiFactor: multiFactor,
      });
      setName("");
      setEmail("");
      setPassword("");
      setPublicKey("");
      setPrivateKey("");
      setMultiFactor("");
      toast.toast({
        title: "User created successfully",
      });
    } catch (error) {
      toast.toast({
        title: "Failed to create user",
      });
    }
  }

  return (
    <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-[100vh]">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <Card className="max-w-md mx-auto bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-4 pt-1 text-white">
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
            <CardDescription>
              Fill out the form below to add a new user to the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="example@acme.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="public-key">Public Key</Label>
              <Input
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                id="public-key"
                placeholder="Paste public key here"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="private-key">Private Key</Label>
              <Input
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                id="private-key"
                placeholder="Paste private key here"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="private-key">Multiply Factor</Label>
              <Input
                value={multiFactor}
                onChange={(e) => setMultiFactor(e.target.value)}
                id="Multiply Factor"
                placeholder="Paste Multiply Factor here"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="overflow-hidden text-ellipsis ml-1 bg-[#183534] hover:bg-[#183534] p-3 rounded-lg shadow-sm"
              onClick={signInWithCredentials}
            >
              Create User
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;
