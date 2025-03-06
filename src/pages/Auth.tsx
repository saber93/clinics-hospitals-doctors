
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold mt-6">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === "login" 
              ? "Enter your credentials to access your account" 
              : "Fill in your details to create an account"}
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="text-center">Authentication form will go here</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
