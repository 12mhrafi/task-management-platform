import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./Layouts/Root";
import Error from "./Error/Error";
import Home from "./Pages/Home/Home";
import Login from "./Components/Header/Login/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import TaskEdit from "./Pages/Dashboard/TaskEdit";
import DashboardRoot from "./Pages/Dashboard/DashboardRoot";
import Support from "./Pages/Support";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path:"/",
        element:<Home /> 
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path: "/support",
        element: <Support></Support>
      },
      {
        path:"/register",
        element: <Register />
      },
      {
        path:"/taskEdit/:id",
        loader: ({params}) => fetch(`https://task-server-wheat.vercel.app/taskGet/${params.id}`),
        element: <TaskEdit />
      }
    ]
  },
  {
    path:"/dashboard",
    element: <DashboardRoot></DashboardRoot>,
    children: [
      {
        path:"/dashboard",
        element: <PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>
      },
    ]
  },
]);

export default router;