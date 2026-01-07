import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-2">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="text-lg font-semibold font-headline">FitAI</span>
              </div>
            </SidebarHeader>
            <Separator />
            <SidebarContent>
              <SiteNav />
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
