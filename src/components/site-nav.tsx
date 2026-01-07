"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Dumbbell,
  Video,
  Trophy,
  ShieldCheck,
  User,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/workout-plan", icon: Dumbbell, label: "Workout Plan" },
  { href: "/form-analysis", icon: Video, label: "Form Analysis" },
  { href: "/chatbot", icon: MessageCircle, label: "Chatbot" },
  { href: "/challenges", icon: Trophy, label: "Challenges" },
  { href: "/profile", icon: User, label: "Profile" },
];

const expertNavItems = [
  { href: "/validation", icon: ShieldCheck, label: "Expert Validation" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      {expertNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
