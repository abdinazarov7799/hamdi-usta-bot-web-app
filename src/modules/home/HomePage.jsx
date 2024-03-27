import React, {useState} from 'react';
import {Carousel, Col, Row, Space, Typography, Tag, FloatButton} from "antd";
import Container from "../../components/Container.jsx";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get, isEqual} from "lodash";
import {useTranslation} from "react-i18next";
import ProductContainer from "./components/ProductContainer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AffixContainer from "../../components/AffixContainer.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {ShoppingCartOutlined} from "@ant-design/icons";
const {Text} = Typography

const HomePage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {lang,userId} = useParams();
    const [checked, setChecked] = useState();
    const [hasMore, setHasMore] = useState(true);
    const {data:categoriesData,isLoading:categoriesIsLoading} = useGetAllQuery({
        key: KEYS.category_list,
        url: URLS.category_list,
        params: {
            params: {
                user_id: userId,
            }
        }
    })
    const {data:bannerData,isLoading:bannerIsLoading} = useGetAllQuery({
        key: KEYS.banner_list,
        url: URLS.banner_list,
        params: {
            params: {
                user_id: userId,
            }
        }
    })


    return (
        <Container>
            <Space style={{width: "100%"}} direction={"vertical"}>
                <Row gutter={[10,10]}>
                    {
                        get(categoriesData,'data.data')?.map((item) => (
                            <Col span={6} key={get(item,'id')} style={{textAlign: "center"}}>
                                <div style={{
                                    height: 100,
                                    backgroundImage: `url(${get(item,'imageUrl')})`,
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    borderRadius: "20px"
                                }}>
                                </div>
                                <Text>{get(item,'name')}</Text>
                            </Col>
                        ))
                    }
                </Row>
                <Carousel autoplay>
                    {
                        get(bannerData, 'data.data')?.map((item) => (
                            <div key={get(item,'id')}>
                                <div style={{
                                    height: 200,
                                    backgroundImage: `url(${get(item, 'imageUrl')})`,
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                }}>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
                <AffixContainer>
                    <Space>
                        {
                            get(categoriesData,'data.data')?.map((item) => (
                                <Tag.CheckableTag
                                    style={{padding: "5px 10px"}}
                                    key={get(item,'id')}
                                    checked={isEqual(get(item,'id'),checked)}
                                    onChange={() => setChecked(get(item,'id'))}
                                >
                                    {get(item,'name')}
                                </Tag.CheckableTag>
                            ))
                        }
                    </Space>
                </AffixContainer>
                {
                    get(categoriesData,'data.data',[])?.map((item) => {
                        return <ProductContainer category={item} key={get(item,'id')} userId={userId}/>
                    })
                }
            </Space>
            <FloatButton onClick={() => navigate(`/basket/${userId}/${lang}`)} icon={<ShoppingCartOutlined />} />
        </Container>
    );
};

export default HomePage;
