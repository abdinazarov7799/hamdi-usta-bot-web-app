import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get, head, isEqual} from "lodash";
import {Button, Flex, Input, Radio, Space, Spin, theme, Typography} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import useStore from "../../services/store/useStore.jsx";
const {Text,Title} = Typography;
const ProductViewPage = () => {
    const {id,userId,lang,isOpen} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [selected, setSelected] = useState();
    const [order, setOrder] = useState(0);
    const {decrement, increment, orders} = useStore();
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
    useEffect(() => {
        const order = orders.find((order) => order.variationId === get(selected,'id'));
        setOrder(order)
    }, [orders,selected]);
    const incrementProduct = () => {
        increment({
            variationId: get(selected,'id'),
            variationName: get(selected,'name'),
            price: get(selected,'price'),
            id: get(selected,'product.id'),
            name: get(selected,'product.name'),
            imageUrl: get(selected,'product.imageUrl'),
        })
    }
    if (isLoading){
        return <Spin fullscreen/>
    }
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

                <Radio.Group
                    style={{display: "flex", flexDirection: "column", paddingBottom: 70}}
                    onChange={(e) => setSelected(head(headData?.filter(data => isEqual(get(data,"id"),get(e,'target.value')))))}
                >
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
                {
                    selected && (
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
                                        {get(selected, 'name')}
                                    </Text>
                                    <Space>
                                        <Text style={{marginRight: 5}}>
                                            {order ? (get(order,'count') * get(order,'price')) : 0} {t("so'm")}
                                        </Text>
                                        <Button
                                            type={"primary"}
                                            onClick={() => decrement(get(selected, 'id'))}
                                        >
                                            -
                                        </Button>
                                        <Input
                                            value={order ? get(order,'count') : 0}
                                            min={0}
                                            controls={false}
                                            type={"number"}
                                            style={{textAlign: "center", width: 50}}
                                        />
                                        <Button
                                            type={"primary"}
                                            onClick={incrementProduct}
                                        >
                                            +
                                        </Button>
                                    </Space>
                                </Flex>
                            </Space>
                        </div>
                    )
                }
            </Space>
        </Container>
    );
};

export default ProductViewPage;
