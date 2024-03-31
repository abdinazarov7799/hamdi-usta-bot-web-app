import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get, head} from "lodash";
import {Button, Col, Flex, Input, Radio, Row, Space, Typography} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import useStore from "../../services/store/useStore.jsx";
const {Text,Title} = Typography;
const ProductViewPage = () => {
    const {id,userId,lang,isOpen} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {decrement, increment} = useStore();
    const {data,isLoading} = useGetOneQuery({
        id,
        key: KEYS.get_variation,
        url: URLS.get_variation,
        params: {
            params: {
                user_id: userId
            }
        }
    })
    const headData = get(data,'data.data')
    const product = get(head(headData),'product');
    console.log(headData,'headData')
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}}>
                <Flex>
                    <Button
                        type={"primary"}
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(`/${userId}/${lang}/${isOpen}`)}
                    >
                        {t("Back")}
                    </Button>
                </Flex>
                <img
                    src={get(product, 'imageUrl')}
                    height={300}
                    style={{width: "100%", objectFit: "cover"}}
                />
                <Title level={4}>{get(product,'name')}</Title>
                <Row gutter={[5,15]} style={{paddingBottom: 70}}>
                    {
                        headData?.map((item,index) => {
                            return (
                                <Col span={24} key={index+1}>
                                    <Row>
                                        <Col span={12}>
                                            <Space direction={"vertical"}>
                                                <Title level={5}>{get(item,'measure')} {get(item,'measureUnit.name')}</Title>
                                                <Text>{get(item,'price')} {t("so'm")}</Text>
                                            </Space>
                                        </Col>
                                        <Col span={7} >
                                            <Space direction={"vertical"}>
                                                <Text>{get(item,'price') * 0} {t("so'm")}</Text>
                                                <Flex>
                                                    <Button
                                                        type={"primary"}
                                                        onClick={() => decrement(get(item,'id'))}
                                                    >
                                                        -
                                                    </Button>
                                                    <Input style={{textAlign: "center", margin: "0 5px"}} value={get(item,'count')}/>
                                                    <Button
                                                        type={"primary"}
                                                        onClick={() => increment(item)}
                                                    >
                                                        +
                                                    </Button>
                                                </Flex>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Radio.Group style={{display: "flex", flexDirection: "column"}}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </Radio.Group>
            </Space>
        </Container>
    );
};

export default ProductViewPage;
