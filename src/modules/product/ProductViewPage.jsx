import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get, head, isEqual} from "lodash";
import {Alert, Button, Col, Flex, Input, Radio, Row, Space, theme, Typography} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import useStore from "../../services/store/useStore.jsx";
const {Text,Title} = Typography;
const ProductViewPage = () => {
    const {id,userId,lang,isOpen} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {decrement, increment} = useStore();
    const {
        token: { colorBorder },
    } = theme.useToken();
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
                        icon={<ArrowLeftOutlined/>}
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
                <Title level={4}>{get(product, 'name')}</Title>

                <Radio.Group style={{display: "flex", flexDirection: "column", paddingBottom: 70}} size={"large"}>
                    <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                        {
                            headData?.map((item) => {
                                return  <Radio
                                    value={get(item,'id')}
                                    key={get(item,'id')}
                                >
                                    <Text>{get(item,'name')}</Text>
                                    <Text style={{margin: "0 10px"}}>{get(item,'measure')} {get(item,'measureUnit.name')}</Text>
                                    <Text>{get(item,'price')} {t("so'm")}</Text>
                                </Radio>
                            })
                        }
                    </Space>
                </Radio.Group>
                <div style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    padding: "7px 15px",
                    width: "100%",
                    backgroundColor: colorBorder
                }}>
                    <Space direction={"vertical"} style={{width: "100%"}}>
                        <Flex justify={"space-between"} align={"center"}>
                            <Text>
                                {t("Общая стоимость товаров:")}
                            </Text>
                            <Text>
                                 {t("so'm")}
                            </Text>
                        </Flex>
                    </Space>
                </div>
            </Space>
        </Container>
    );
};

export default ProductViewPage;
