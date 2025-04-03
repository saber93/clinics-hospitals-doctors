
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const AdminMobileNav = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-background border-b md:hidden py-2 px-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">Admin Dashboard</h1>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdminMobileNav;
