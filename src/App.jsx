import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./routes/Error";
import Layout from "./routes/Layout";
import Login from "./routes/Login";
import SignUp from "./routes/Signup";
import Home from "./routes/Home";
import RequireAuth from "./components/RequireAuth";
import Notes from "./routes/Notes";
import NewNote from "./routes/NewNote";
import ViewNote from "./routes/ViewNote";
import EditNote from "./routes/EditNote";
import store, { persistor } from "./redux";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/create",
        element: <NewNote />,
      },
      {
        path: "/notes/:id",
        element: <ViewNote />,
      },
      {
        path: "/notes/:id/edit",
        element: <EditNote />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
