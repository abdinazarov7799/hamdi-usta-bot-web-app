import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {ConfigProvider, theme} from "antd";
import {useTelegram} from "../hooks/useTelegram.jsx";
import {get, isEqual} from "lodash";
const { defaultAlgorithm, darkAlgorithm } = theme;
const {tg} = useTelegram();

const CustomTheme = {
    algorithm: isEqual(get(tg,'colorScheme','light'),'light') ? defaultAlgorithm : darkAlgorithm,
    fonts: {
        heading: `'Montserrat', sans-serif`,
        body: `'Montserrat', sans-serif`,
    },
    token: {
        colorPrimary: '#00b96b',
        borderRadius: '5px',
    },
}

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        overflow-x: hidden;
        max-width: 560px;
        margin: 0 auto;
        min-height: 100vh;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .active button {
        background-color: #dcdbdb;
    }
`
const Theme = ({ children }) => {

  return (
    <ThemeProvider theme={{}}>
        <GlobalStyles />
      <ConfigProvider theme={CustomTheme}>
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default Theme;
