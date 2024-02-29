import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList.jsx";
import Form from "./components/Form.jsx";
import {Button, Flex, Layout, Typography} from "antd";
const { Title } = Typography;
const { Header, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fefefe',
};
const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#fefefe',
};
function App() {
    const {tg,user, onClose} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <Layout>
            <Header style={headerStyle}>
                <Flex align={"center"} justify={"space-between"}>
                    <Button onClick={onClose}>Oynani yopish</Button>
                    <Title level={5}>
                        {user?.username}
                    </Title>
            </Flex>
            </Header>
            <Content style={contentStyle}>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<ProductList />}/>
                        <Route path={'/form'} element={<Form />}/>
                        <Route path={'*'} element={<ProductList />}/>
                    </Routes>
                </BrowserRouter>
            </Content>
        </Layout>
    );
}

export default App;
