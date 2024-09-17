import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { MainLayout } from "@layoutes/index";
const MainLayout = lazy(() => import("@layoutes/index"));
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
import Error from "@pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback="loading please wait...">
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="loading please wait...">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback="loading please wait...">
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback="loading please wait...">
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "/category",
        element: (
          <Suspense fallback="loading please wait...">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/category/products/:prefix",
        element: (
          <Suspense fallback="loading please wait...">
            <Products />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback="loading please wait...">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback="loading please wait...">
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback="loading please wait...">
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
