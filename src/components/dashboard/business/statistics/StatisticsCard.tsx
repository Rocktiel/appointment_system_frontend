import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  icon: React.ReactNode;
  value: number | string;
  description: string;
}
const StatisticsCard = ({
  title,
  icon,
  value,
  description,
}: StatisticsCardProps) => {
  return (
    <Card className="flex flex-col h-full shadow-md border-l-5 border-blue-500 hover:scale-105 transition-transform">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-4xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
