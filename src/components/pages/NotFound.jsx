import { useNavigate } from "react-router-dom";
import { ApperIcon } from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <ApperIcon name="FileQuestion" size={48} className="text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          <ApperIcon name="Home" size={20} className="mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;