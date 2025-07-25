import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/main-layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRouter = () => {
  const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <Signup /> },
  ];
  const mainRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
  ];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        {publicRoutes.map(({ path, component }, index) => (
          <Route
            key={index}
            path={path}
            element={component}
          />
        ))}
        {mainRoutes.map(({ path, component }, index) => (
          <Route
            key={index}
            path={path}
            element={<MainLayout>{component}</MainLayout>}
          />
        ))}
        {/* TODO: Add 404 page */}
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
