import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/Root";
import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";
import Modals from "./components/pages/Modals";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/:id",
          element:<Modals/>
        }
      ],
    },
  ]);
  return(
    <>
    <RouterProvider router={router}/>
        </>
  );
};

export default App;
