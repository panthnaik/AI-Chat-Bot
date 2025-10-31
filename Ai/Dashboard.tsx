import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Settings } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>Settings</Button>
      </header>

      {/* Cards Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center space-x-2">
            <BarChart className="text-blue-500" />
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View site performance and stats.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center space-x-2">
            <Users className="text-green-500" />
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage users and permissions.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center space-x-2">
            <Settings className="text-orange-500" />
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure your dashboard easily.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
