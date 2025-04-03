import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, Layers, Users, MessageSquare, Settings, BarChart4 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="z-50">
          <SidebarHeader>
            <div className="px-4 py-3">
              <h2 className="text-lg font-semibold">Admin Portal</h2>
              <p className="text-xs text-muted-foreground">Manage your application</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/admin-dashboard" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Overview</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/admin/analytics" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <BarChart4 className="h-4 w-4" />
                        <span>Analytics</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Content</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/admin/blogs" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Blog Posts</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/admin/services" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <Layers className="h-4 w-4" />
                        <span>Services</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Users & Communication</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/vendors" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <Users className="h-4 w-4" />
                        <span>Vendors</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/clients" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <Users className="h-4 w-4" />
                        <span>Clients</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/admin/contact-messages" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Contact Messages</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/admin/settings" 
                        className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="w-full flex flex-col relative">
          <header className="sticky top-0 left-0 w-full z-40 bg-white border-b h-16">
            <div className="flex items-center h-full px-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">
                {location.pathname === "/admin-dashboard" && "Dashboard Overview"}
                {location.pathname === "/admin/blogs" && "Blog Management"}
                {location.pathname === "/admin/services" && "Services Management"}
                {location.pathname === "/admin/contact-messages" && "Contact Messages"}
                {location.pathname === "/admin/settings" && "Admin Settings"}
                {location.pathname === "/vendors" && "Vendor Management"}
                {location.pathname === "/clients" && "Client Management"}
                {location.pathname === "/admin/analytics" && "Analytics Dashboard"}
              </h1>
            </div>
          </header>

          <main className="flex-1 px-6 py-6">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
