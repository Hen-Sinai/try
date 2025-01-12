import React from "react";
import AnomaliesTable from "../components/AnomaliesTable/AnomaliesTable";
import SummaryPanel from "../components/SummaryPanel/SummaryPanel";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Ad Insights Dashboard</h1>
      <AnomaliesTable />
      <SummaryPanel />
    </div>
  );
};

export default Dashboard;
