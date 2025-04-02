
import { ReactNode } from "react";

interface OffersLayoutProps {
  title: string;
  children: ReactNode;
}

const OffersLayout = ({ title, children }: OffersLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default OffersLayout;
