import { useEffect } from "react";
import Task from "../../components/task/Task";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
     <Task />
    </div>
  );
};

export default Home;
