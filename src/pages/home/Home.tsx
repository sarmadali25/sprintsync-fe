import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      HOME SCREEN
    </div>
  );
};

export default Home;
