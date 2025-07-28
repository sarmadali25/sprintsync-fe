import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../layout/main-layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCurrentUser } from "../store/slices/userSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const { user: { data: currentUser, loading } } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && !currentUser?.id) {
      dispatch(fetchCurrentUser());
    }
  }, [token, currentUser, dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!token && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRouter = () => {
  const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <Signup /> },
  ];
  const mainRoutes = [
    {path: "/task", component: <Home />},
  ];

  return (
    <Router>
      <Routes>
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
            element={
              <ProtectedRoute>
                <MainLayout>{component}</MainLayout>
              </ProtectedRoute>
            }
          />
        ))}
        {/* TODO: Add 404 page */}
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
