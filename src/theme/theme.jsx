import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {ConfigProvider, theme} from "antd";
import {useTelegram} from "../hooks/useTelegram.jsx";
import {get} from "lodash";
const { defaultAlgorithm, darkAlgorithm } = theme;
const {tg} = useTelegram();

const CustomTheme = {
    algorithm: get(tg,'colorScheme',true) ? defaultAlgorithm : darkAlgorithm,
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
