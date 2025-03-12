
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LoadingProductsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((n) => (
        <Card key={n} className="animate-pulse">
          <CardHeader className="h-48 bg-gray-200 rounded-t-lg" />
          <CardContent className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoadingProductsGrid;
