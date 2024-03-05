import React, {useEffect} from 'react';
import {useTelegram} from "../../hooks/useTelegram.jsx";
import {Avatar, Button, Card, Carousel, Col, Image, Row, Skeleton, Typography} from "antd";
const {Text} = Typography

const MenuPage = () => {
    const {tg} = useTelegram();
    const isLoading = false;
    useEffect(() => {
        tg.ready();
    }, [])

    const mockCategory = [
        {label: 'category1', imgUrl: 'https://telegra.ph/file/ec81ee0eed6d1341b5c3c.jpg'},
        {label: 'category2', imgUrl: 'https://telegra.ph/file/ec81ee0eed6d1341b5c3c.jpg'},
        {label: 'category3', imgUrl: 'https://telegra.ph/file/ec81ee0eed6d1341b5c3c.jpg'},
        {label: 'category4', imgUrl: 'https://telegra.ph/file/ec81ee0eed6d1341b5c3c.jpg'},
        {label: 'category5', imgUrl: 'https://telegra.ph/file/ec81ee0eed6d1341b5c3c.jpg'},
        {label: 'category6', imgUrl: 'https://telegra.ph/file/ec81ee0eed6d1341b5c3c.jpg'},
    ]
    return (
        <>
            <Row>
                {
                    mockCategory.map((item,index) => (
                        <Col key={index+1} span={8} style={{padding: 7}}>
                            <Card style={{textAlign: "center"}}>
                                <Skeleton.Avatar loading={isLoading} avatar active size={"large"}>
                                    <Avatar src={item.imgUrl} size={"large"} />
                                </Skeleton.Avatar>
                                <Text>{item.label}</Text>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Button type={"primary"} block>Button</Button>
            <Row>
                <Carousel autoplay style={{width: "100%"}}>
                    {
                        mockCategory.map((item,index) => (
                            <div key={index+1}>
                                <Image src={item.imgUrl} width={100} height={100}/>
                            </div>
                        ))
                    }
                </Carousel>
            </Row>
        </>
    );
};

export default MenuPage;
