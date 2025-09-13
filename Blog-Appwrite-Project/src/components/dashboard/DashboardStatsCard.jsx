// src/components/dashboard/DashboardStatsCard.jsx
import React from "react";

const DashboardStatsCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg border border-gray-200">
      {icon && <div className="text-blue-500 mr-4">{icon}</div>}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
