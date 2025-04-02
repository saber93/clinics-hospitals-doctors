
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthRequiredMessage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-6">Please log in to book appointments.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    </div>
  );
};

export default AuthRequiredMessage;
