import React from 'react';
import {useTelegram} from "../hooks/useTelegram.jsx";
import '../index.css';
import {Button, Typography} from "antd";
const { Title } = Typography;

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <Title level={5}>
                {user?.username}
            </Title>
        </div>
    );
};

export default Header;
