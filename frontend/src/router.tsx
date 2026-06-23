import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard.tsx";
import AuthPage from "./pages/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SpacePage from "./pages/SpacePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <AuthPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "space", element: <SpacePage /> },
    ],
  },
]);
