
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SystemStatusPanelProps {
  handleSeedData: () => Promise<void>;
}

const SystemStatusPanel = ({ handleSeedData }: SystemStatusPanelProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Resource utilization and settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Database storage</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">API usage</span>
              <span className="text-sm font-medium">62%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-sm font-medium">18%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate("/system/settings")}>
          System Settings
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSeedData}
          className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
        >
          Generate Test Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemStatusPanel;
