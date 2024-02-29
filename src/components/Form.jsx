import React, {useCallback, useEffect, useState} from 'react';
import '../index.css';
import {useTelegram} from "../hooks/useTelegram.jsx";
import {Input, Select, Space, Typography} from "antd";
const { Title } = Typography;
const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Malumotlarni yuborish'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    return (
        <Space direction="vertical" size={"middle"}>
            <Title level={3}>Malumotlaringizni kiriting</Title>
            <Input
                placeholder="Mamlakat"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <Input
                placeholder="Ko'cha"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <Select
                value={subject}
                onChange={(value) => setSubject(value)}
                options={[
                    {
                        value: 'physical',
                        label: 'Jismoniy',
                    },
                    {
                        value: 'legal',
                        label: 'Yuridik',
                    },
                ]}
            />
        </Space>
    );
};

export default Form;
