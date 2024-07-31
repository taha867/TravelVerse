import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import UserPage from "../pages/UserPage";
import PostPage from "../pages/PostPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [
        {
          path: "/",
          element: <UserPage />,
        },
        {
          path: "/",
          element: <PostPage />,
        },
      ],
    },
  ]);

  export default router;