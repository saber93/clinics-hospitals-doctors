
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({ size = "md", className = "" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };
  
  return (
    <div className={`flex justify-center p-12 ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full`}></div>
    </div>
  );
};

export default LoadingSpinner;
