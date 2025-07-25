import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      DASHBOARD SCREEN
    </div>
  );
};

export default Dashboard;
