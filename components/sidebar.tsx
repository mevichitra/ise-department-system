"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Home,
  LucideIcon, 
  UserCircle2, 
  BookText,
  School,
  BookMarked,
  LibraryBig,
  UsersRound,
  LineChart,
  Settings
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Students",
    href: "/students",
    icon: School,
  },
  {
    title: "Faculty",
    href: "/faculty",
    icon: UsersRound,
  },
  {
    title: "Subjects",
    href: "/subjects",
    icon: BookMarked,
  },
  {
    title: "Classes",
    href: "/classes",
    icon: LibraryBig,
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: BookText,
  },
  {
    title: "Marks",
    href: "/marks",
    icon: LineChart,
    badge: "New"
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-5">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1.5">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">ISE Department</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href} 
                tooltip={item.title}
                className="group transition-colors duration-200"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors 
                    ${pathname === item.href 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground group-hover:bg-secondary group-hover:text-foreground'}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle2 className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Department Head</p>
            </div>
          </div>
          <Link href="/settings" className="rounded-full p-1.5 hover:bg-muted">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">© {currentYear} ISE Department</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
