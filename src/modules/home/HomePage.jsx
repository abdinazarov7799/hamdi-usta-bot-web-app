import React, {useEffect, useState} from 'react';
import {Carousel, Col, Row, Space, Typography, Tag, FloatButton} from "antd";
import Container from "../../components/Container.jsx";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get, isEqual, head} from "lodash";
import {useTranslation} from "react-i18next";
import ProductContainer from "./components/ProductContainer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AffixContainer from "../../components/AffixContainer.jsx";
import {ShoppingCartOutlined, TruckOutlined} from "@ant-design/icons";
const {Text} = Typography

const HomePage = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {lang,userId} = useParams();
    const [activeCategory, setActiveCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    let count = 0
    const {data:categoriesData,isLoading:categoriesIsLoading,isFetching:categoryIsFetching} = useGetAllQuery({
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
    useEffect(() => {
        setActiveCategory(head(get(categoriesData,'data.data',[])));
        setCategories([head(get(categoriesData,'data.data',[]))]);
    }, [categoryIsFetching,categoriesIsLoading]);
    useEffect(() => {
        if (!hasMore){
            setHasMore(true)
        }
    }, [categories]);

    window.addEventListener("scroll",(event) => {
        const offsetHeight = get(event,"target.scrollingElement.offsetHeight");
        const scrollingHeight = window.scrollY + window.innerHeight;
        if((offsetHeight - scrollingHeight) < 200 && hasMore && get(categoriesData,'data.data',[]).length > count) {
            count = count+1;
            const newCategory = get(categoriesData,`data.data[${count}]`);
            if (!categories?.find(item => !isEqual(get(item,'id'),get(newCategory,'id')))){
                setCategories(prevState => [
                    ...prevState,
                    newCategory,
                ])
            }
            setHasMore(false);
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
                                    checked={isEqual(get(item,'id'),get(activeCategory,'id'))}
                                    onChange={() => setActiveCategory(item)}
                                >
                                    {get(item,'name')}
                                </Tag.CheckableTag>
                            ))
                        }
                    </Space>
                </AffixContainer>
                <div>
                    {
                        categories?.map((item) => {
                            return <ProductContainer category={item} key={get(item,'id')} userId={userId}/>
                        })
                    }
                </div>
            </Space>
            <FloatButton.Group>
                <FloatButton onClick={() => navigate(`/basket/${userId}/${lang}`)} icon={<ShoppingCartOutlined />} />
                <FloatButton onClick={() => navigate(`/orders/${userId}/${lang}`)} icon={<TruckOutlined />} />
                <FloatButton.BackTop />
            </FloatButton.Group>
        </Container>
    );
};

export default HomePage;
