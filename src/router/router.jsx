import React, {Suspense} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Spin} from "antd";
import Loader from "../components/Loader.jsx";
import MenuPage from "../modules/menu/MenuPage.jsx";

// PAGES
// PAGES


const Router = ({ ...rest }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
              path={"/"}
              index
              element={<MenuPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
