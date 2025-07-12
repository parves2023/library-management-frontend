import App from "@/App";
import {
  createBrowserRouter,
} from "react-router";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import AddBooks from "@/pages/AddBooks";
import ShowAllBooks from "@/pages/ShowAllBooks";
import ShowDetails from "@/pages/ShowDetails";
import BorrowedBooks from "@/pages/BorrowedBooks";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "app",
        element: <App />,
      },
      {
  path: "/add-book",
  element: <AddBooks />,
},
{
  path: "/all-books",
  element: <ShowAllBooks />,
},
{
path: "/details/:id",
element: <ShowDetails />
},
{
  path: "/borrowed-books",
  element: <BorrowedBooks></BorrowedBooks>
},
{
  path: "/login",
  element: <div>Login</div>
}

    ],
  },
]);


export default router;
