import React from 'react';
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import {get, isArray} from "lodash";
import {Button, Card, Col, Input, Row, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
const {Title,Text} = Typography;

const body = {
    padding: 8
}
const ProductContainer = ({category,userId}) => {
    const {t} = useTranslation();
    const {data,isLoading} = useGetOneQuery({
        id: get(category,'id'),
        url: URLS.get_product,
        key: `${KEYS.get_product}_${get(category,'id')}`,
        params: {
            params: {
                user_id: userId
            }
        }
    })

    return (
        <div>
            <Title level={4}>{get(category,'name')}</Title>
            <Row gutter={[10,15]}>
                {
                    isArray(get(data,'data.data')) && get(data,'data.data',[])?.map((item,index) => {
                        return (
                            <Col span={8} key={index+1}>
                                <Card
                                    hoverable
                                    cover={<img src={get(item,'imageUrl')}/>}
                                    styles={{body}}
                                >
                                    <Title level={5}>{get(item,'name')}</Title>
                                    <Text>
                                        {Intl.NumberFormat('en-US').format(get(item,'price'))}
                                        {" "} {t("so'm")} {!get(item,'oneVariation') && t("dan")}
                                    </Text>
                                    {
                                        get(item,'oneVariation') ?
                                            <Button block type={"primary"} style={{marginTop: 7}}>
                                                {t("Savatga qo'shish")}
                                            </Button> :
                                            <Space style={{marginTop: 7}}>
                                                <Button type={"primary"}>-</Button>
                                                <Input style={{textAlign: "center"}} />
                                                <Button type={"primary"}>+</Button>
                                            </Space>
                                    }
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    );
};

export default ProductContainer;
