import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Posts from "../pages/Posts";
import About from "../pages/About";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { privateRoutes, publicRoutes } from "../router/index";
import Login from "../pages/Login";
import { AuthContext } from "../context";
import { useContext } from "react";
import Loader from "./UI/loader/Loader";
const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      <Route exact path="/about" element={<About />} key={"/about"} />
      <Route exact path="/posts" element={<Posts />} key={"/posts"} />
      <Route
        exact
        path="/posts/:id"
        element={<PostIdPage />}
        key={"/posts/:id"}
      />
      <Route path="/error" element={<Error />} key={"/error"} />
      <Route path="*" element={<Posts />} key={"*"} />
    </Routes> /* {privateRoutes.map((route) => (
        <Route
          element={route.element}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))} */
  ) : (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />{" "}
    </Routes>
  );

  /* {publicRoutes.map(route =>
                    <Route
                    element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )} */
};
export default AppRouter;
