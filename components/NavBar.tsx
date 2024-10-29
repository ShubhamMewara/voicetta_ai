"use client";

import {
  ActivityIcon,
  HeadsetIcon,
  ViewIcon,
  DollarSignIcon,
  Podcast,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import LogInButton from "./login-btn";

const NavBar = () => {
  const pathname = usePathname();

  let navItems = [
    { href: "/dashboard", icon: ViewIcon, label: "Overview" },
    { href: "/realtime", icon: Podcast, label: "Realtime" },
    { href: "/assistants", icon: ActivityIcon, label: "Assistants" },
    { href: "/billing", icon: DollarSignIcon, label: "Billing" },
    { href: "/support", icon: HeadsetIcon, label: "Support" },
  ];

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
        <LogInButton />
      </div>
    </div>
  );
};

export default NavBar;
