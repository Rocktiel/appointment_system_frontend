import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
}

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-amber-400 mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
