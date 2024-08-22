import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Products from "@pages/Products";
import AboutUs from "@pages/AboutUs";
import Login from "@pages/Login";
import Register from "@pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@layoutes/index";
import Error from "@pages/Error";
import Cart from "@pages/Cart";
import Wishlist from "@pages/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/category",
        element: <Categories />,
      },
      {
        path: "/category/products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            typeof params.prefix != "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("bad request", {
              statusText: "catgeory not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
