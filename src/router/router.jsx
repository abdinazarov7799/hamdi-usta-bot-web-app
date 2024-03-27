import React, {Suspense, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import HomePage from "../modules/home/HomePage.jsx";
import {useTelegram} from "../hooks/useTelegram.jsx";
import ProductPage from "../modules/product/ProductPage.jsx";
import BasketPage from "../modules/basket/BasketPage.jsx";

const Router = ({ ...rest }) => {
    const {tg} = useTelegram();
    useEffect(() => {
        tg.ready();
    }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
            <Route
              path={"/:userId/:lang"}
              index
              element={<HomePage />}
            />
            <Route
              path={"/product/:id"}
              index
              element={<ProductPage />}
            />
            <Route
              path={"/basket/:userId/:lang"}
              index
              element={<BasketPage />}
            />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
