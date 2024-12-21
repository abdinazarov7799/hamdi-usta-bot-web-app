import React, {useEffect, useState} from 'react';
import {Carousel, Space, Typography, FloatButton, Button, Modal, Spin} from "antd";
import Container from "../../components/Container.jsx";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import ProductContainer from "./components/ProductContainer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AffixContainer from "../../components/AffixContainer.jsx";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-scroll";
import useStore from "../../services/store/useStore.jsx";
const {Text} = Typography

const HomePage = () => {
    const {t,i18n} = useTranslation();
    const navigate = useNavigate();
    const {lang,userId} = useParams();
    const {setBranchesIsOpen,setBotWorked} = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data:categoriesData,isLoading} = useGetAllQuery({
        key: KEYS.product_list,
        url: URLS.product_list,
        params: {
            params: {
                user_id: userId,
            }
        }
    })
    const {data:bannerData} = useGetAllQuery({
        key: KEYS.banner_list,
        url: URLS.banner_list,
        params: {
            params: {
                user_id: userId,
            }
        }
    })
    const {data} = useGetAllQuery({
        key: KEYS.get_branch_active,
        url: URLS.get_branch_active,
    })

    useEffect(() => {
        setBranchesIsOpen(get(data,'data.data.branchActive'));
        setBotWorked(get(data,'data.data.botWorking'));
        setIsModalOpen(!get(data,'data.data.branchActive',true) || !get(data,'data.data.botWorking',true))
    }, [data]);

    const changeLang = () => {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang)
    }
    useEffect(() => {
        changeLang();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scrollPosition = params.get('scroll');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
        }
    }, [location.search]);

    if (isLoading) {
        return <Spin fullscreen/>;
    }

    return (
        <Container>
            <Modal title={t("Ma'lumot")} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Text>
                    {t("Hozirgi vaqtda barcha filiallarimiz yopilgan. Keltirilgan noqulayliklar uchun uzr so'raymiz.")}
                </Text>
            </Modal>
            <Space style={{width: "100%"}} direction={"vertical"}>
                <Carousel autoplay autoplaySpeed={10000}>
                    {
                        get(bannerData, 'data.data')?.map((item) => {
                            const isVideo = get(item, 'imageUrl')?.endsWith('.mp4');
                            return (
                                <div key={get(item, 'id')}>
                                    {isVideo ? (
                                        <video
                                            style={{
                                                height: 200,
                                                width: "100%",
                                                objectFit: "cover",
                                            }}
                                            src={get(item, 'imageUrl')}
                                            autoPlay
                                            muted
                                            loop
                                        />
                                    ) : (
                                        <div style={{
                                            height: 200,
                                            backgroundImage: `url(${get(item, 'imageUrl')})`,
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                        }}>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    }
                </Carousel>
                <AffixContainer>
                    <Space>
                        {
                            get(categoriesData,'data.data')?.map((item) => (
                                <Link
                                    key={get(item,'categoryId')}
                                    activeClass="active"
                                    to={get(item,'categoryName')}
                                    smooth
                                    spy
                                    offset={-50}
                                >
                                    <Button type={"text"}>{get(item,'categoryName')}</Button>
                                </Link>
                            ))
                        }
                    </Space>
                </AffixContainer>
                <div>
                    {
                        get(categoriesData,'data.data',[])?.map((item) => {
                            return <ProductContainer category={item} key={get(item,'categoryId')} userId={userId} lang={lang}/>
                        })
                    }
                </div>
            </Space>
            <FloatButton.Group>
                <FloatButton
                    type={"primary"}
                    onClick={() => navigate(`/basket/${userId}/${lang}`)}
                    icon={<ShoppingCartOutlined />}
                    style={{transform: "scale(1.4)"}}
                />
                <FloatButton.BackTop style={{transform: "scale(1.4)", marginTop: 20}}/>
            </FloatButton.Group>
        </Container>
    );
};

export default HomePage;
