import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import App from "../App";
import UserPage from "../pages/UserPage";
import PostPage from "../pages/PostPage";
import AuthPage from "../pages/AuthPage";

const Router = () => {
  const user = useRecoilValue(userAtom); // Hook is now inside a functional component

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/:username",
          element: <UserPage />,
        },
        {
          path: "/:username/post/:pid",
          element: <PostPage />,
        },
        {
          path: "/auth",
          element: !user ? <AuthPage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
