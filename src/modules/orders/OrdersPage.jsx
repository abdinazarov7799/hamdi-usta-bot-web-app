import React from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import {Button, Flex, Space} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
const OrdersPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {userId,lang} = useParams()
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}}>
                <Flex>
                    <Button
                        type={"primary"}
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(`/${userId}/${lang}`)}
                    >
                        {t("Back")}
                    </Button>
                </Flex>
            </Space>
        </Container>
    );
};

export default OrdersPage;
