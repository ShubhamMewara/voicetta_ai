"use client";
import {
  ActivityIcon,
  PhoneCallIcon,
  PhoneIcon,
  HeadsetIcon,
  ViewIcon,
  VoicemailIcon,
  DollarSignIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import LogInButton from "./login-btn";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const pathname = usePathname();
  const session = useSession();
  // @ts-ignore
  const admin = session.data?.user?.admin;

  let navItems = [
    { href: "/dashboard", icon: ViewIcon, label: "Overview" },
    { href: "/assistants", icon: ActivityIcon, label: "Assistants" },
    { href: "/call-logs", icon: PhoneCallIcon, label: "Call Logs" },
    { href: "/phone-numbers", icon: PhoneIcon, label: "Phone Numbers" },
    { href: "/billing", icon: DollarSignIcon, label: "Billing" },
    { href: "/support", icon: HeadsetIcon, label: "Support" },
  ];

  if (admin) {
    navItems = navItems.filter(
      (item) =>
        item.label !== "Assistants" &&
        item.label !== "Call Logs" &&
        item.label !== "Phone Numbers"
    );
    navItems.push({ href: "/admin", icon: UserIcon, label: "Admin" });
  }

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <header className="text-white px-6 py-4 pb-0 flex items-center bg-[#0e0e0e]">
          <Link href={"/"}>
            <span className="text-2xl font-bold">Voicetta</span>
          </Link>
        </header>
        <aside className="flex text-white w-64 py-8 px-4">
          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <li
                    className={`p-2 my-4 rounded-lg font-bold ${
                      isActive ? "bg-[#18282a] text-[#63beb7]" : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5 inline-block mr-2" />
                    {item.label}
                  </li>
                </Link>
              );
            })}
          </ul>
        </aside>
      </div>
      <div className="flex items-center m-4 ">
        {/* <UserIcon className="h-8 w-8 mr-2" /> */}
        <LogInButton />
      </div>
    </div>
  );
};

export default NavBar;
