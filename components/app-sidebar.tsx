"use client";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  HeadsetIcon,
  LogOut,
  Podcast,
  Sparkles,
  ViewIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: ViewIcon,
  },
  {
    title: "Realtime",
    url: "/realtime",
    icon: Podcast,
  },
  {
    title: "Support",
    url: "/support",
    icon: HeadsetIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const session = useSession();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="flex flex-row text-2xl font-bold p-4 ">
        AD{" "}
        <span className="inline group-data-[collapsible=icon]:hidden">
          Voice
        </span>
        <Image
        src="/images/logo.png"
        alt={""}
        width={50}
        height={50}
        className="size-8 object-cover group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-6">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`p-6 ${
                      pathname === item.url ? "bg-[#18282a] text-[#63beb7]" : ""
                    }`}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session.data?.user?.image!}
                      alt={session.data?.user?.image!}
                    />
                    <AvatarFallback className="rounded-lg text-black">
                      {session.data?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session.data?.user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {session.data?.user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={session.data?.user?.image!}
                        alt={session.data?.user?.name!}
                      />
                      <AvatarFallback className="rounded-lg text-black">
                        {session.data?.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session.data?.user?.name}
                      </span>
                      <span className="truncate text-xs">
                        {session.data?.user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#63beb7]" />
                <DropdownMenuItem
                  className="focus:bg-[#18282a] focus:text-[#63beb7] cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
