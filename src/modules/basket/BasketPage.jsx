import React from 'react';
import Container from "../../components/Container.jsx";
import {Button, Col, Flex, Image, Input, Row, Space, theme, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {get} from "lodash";
import {useNavigate, useParams} from "react-router-dom";
const {Title,Text} = Typography;
const BasketPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {userId,lang} = useParams()
    const items = [
        {
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },{
            imgUrl: "http://localhost:8091/api/images/get/cb572732-a8ed-488d-a89f-e13e9d1fe12f.jpg",
            title: "Pizza Pepperoni",
            variationName: "Middle size",
            price: "15,000",
            count: 2
        },
    ]
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
                <Row gutter={[5,15]} style={{paddingBottom: 70}}>
                    {
                        items?.map((item,index) => {
                            return (
                                <Col span={24} key={index+1}>
                                    <Row align="bottom">
                                        <Col span={5}>
                                            <Image
                                                src={get(item,'imgUrl')}
                                                preview={false}
                                                width={90}
                                                height={90}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <Space direction={"vertical"}>
                                                <Title level={5}>{get(item,'title')}</Title>
                                                <Text>{get(item,'variationName')}</Text>
                                                <Text>{get(item,'price')} {t("so'm")}</Text>
                                            </Space>
                                        </Col>
                                        <Col span={7} >
                                            <Space>
                                                <Button type={"primary"}>-</Button>
                                                <Input style={{textAlign: "center"}} value={get(item,'count')}/>
                                                <Button type={"primary"}>+</Button>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })
                    }
                </Row>
                <div style={{position: "fixed", bottom: 0,left: 0, padding: "7px 15px", backgroundColor: colorBgContainer, width: "100%"}}>
                    <Space direction={"vertical"} style={{width: "100%"}}>
                        <Flex justify={"space-between"} align={"center"}>
                            <Text>
                                {t("Общая стоимость товаров:")}
                            </Text>
                            <Text>
                                567,000 {t("so'm")}
                            </Text>
                        </Flex>
                        <Button block type={"primary"}>
                            {t("Оформить заказ")}
                        </Button>
                    </Space>
                </div>
            </Space>
        </Container>
    );
};

export default BasketPage;
