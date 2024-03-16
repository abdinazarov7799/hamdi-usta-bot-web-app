import React, {Suspense} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import HomePage from "../modules/Home/HomePage.jsx";

const Router = ({ ...rest }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
              path={"/:lang"}
              index
              element={<HomePage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
