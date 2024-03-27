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
                    backgroundColor: colorBgContainer
                }}>
                    {children}
                </div>
            </Affix>
        </div>
    );
};

export default AffixContainer;
