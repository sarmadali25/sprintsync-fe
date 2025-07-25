import MobileNavbar from "../../components/navbar/MobileNavbar";
import Navbar from "../../components/navbar/Navbar";
import useMediaQuery from "../../hooks/useMediaQuery";
import { cn } from "../../utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 1001px)");

  return (
    <div className="w-screen bg-gray-100">
      {!isDesktop &&
      <div className="sticky top-0 z-10 h-[60px]">
       <MobileNavbar />
      </div>
      }
      {isDesktop && <Navbar />}
      <main className="pt-0 lg:pt-20 bg-white">
        <div className={cn( isDesktop ? "h-[calc(100vh-116px)]" : "h-[calc(100vh-60px)]")}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
