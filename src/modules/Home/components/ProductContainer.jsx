import React from 'react';
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import {get, isArray} from "lodash";
import {Card, Col, Row, Typography} from "antd";
import {useParams} from "react-router-dom";
const {Title,Text} = Typography;
const ProductContainer = ({category}) => {
    const {userId} = useParams();
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
            <Title level={4}>{get(category,'name')} :</Title>
            <Row gutter={[10,15]}>
                {
                    isArray(get(data,'data.data')) && get(data,'data.data',[])?.map((item) => {
                        return (
                            <Col span={8}>
                                <Card
                                    hoverable
                                    cover={<img src={get(item,'imageUrl')}/>}
                                >
                                    <Title level={5}>{get(item,'name')}</Title>
                                    <Text>{get(item,'price')}</Text>
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
