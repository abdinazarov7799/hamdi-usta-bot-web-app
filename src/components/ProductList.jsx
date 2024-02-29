import React, {useState,useCallback, useEffect} from 'react';
import '../index.css';
import {useTelegram} from "../hooks/useTelegram.jsx";
import {Button, Card, Space, Typography} from "antd";
const { Text } = Typography;

const products = [
    {id: '1', title: 'Epica', price: 5000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '2', title: 'Epica 2', price: 7000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '3', title: 'Epica 3', price: 2000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '4', title: 'Epica 4', price: 6000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '5', title: 'Epica 5', price: 5000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '6', title: 'Epica 6', price: 5000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '7', title: 'Epica 7', price: 5000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '8', title: 'Epica 8', price: 5000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
    {id: '9', title: 'Epica 9', price: 5000, description: 'AT 2.5', img: 'https://telegra.ph/file/68282be17d4f2592b594d.jpg'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://telegram-bot-nodejs-enhm.onrender.com/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Sotib olish ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <Space wrap>
            {products.map(item => (
                <Card
                    hoverable
                    title={item.title}
                    style={{
                        width: 180,
                    }}
                    cover={
                        <img
                            alt="img"
                            src={item.img}
                        />
                    }
                >
                    <Space direction="vertical" size={"small"}>
                        <Text>{item.description}</Text>
                        <Text>
                            <span>Narxi: <b>{item.price}</b></span>
                        </Text>
                        <Button
                            onClick={() => onAdd(item)}
                            type={"primary"}
                            block
                        >
                            Savatga qo'shish
                        </Button>
                    </Space>
                </Card>
            ))}
        </Space>
    );
};

export default ProductList;
