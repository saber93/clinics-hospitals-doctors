
import { useAppAuth } from "./hooks/useAppAuth";
import AppProviders from "./components/providers/AppProviders";
import AppRoutes from "./components/routing/AppRoutes";
import GlassyNavbar from "./components/layout/GlassyNavbar";
import ModernFooter from "./components/layout/ModernFooter";

const App = () => {
  const { loading } = useAppAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        <GlassyNavbar />
        <div className="flex-grow">
          <AppRoutes />
        </div>
        <ModernFooter />
      </div>
    </AppProviders>
  );
};

export default App;
