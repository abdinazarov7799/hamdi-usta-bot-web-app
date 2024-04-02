import React from 'react';
import {Affix, theme} from "antd";

const AffixContainer = ({children,...rest}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <Affix offsetTop={20}>
                <div style={{
                    maxWidth: 560,
                    overflowX: "scroll",
                    scrollbarWidth: "none",
                    borderRadius: 5,
                    backgroundColor: colorBgContainer,
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
                }}>
                    {children}
                </div>

            </Affix>
        </div>
    );
};

export default AffixContainer;
