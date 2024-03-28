import React from 'react';
import {useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";

const ProductViewPage = () => {
    const {id,userId} = useParams();
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
    return (
        <Container>

        </Container>
    );
};

export default ProductViewPage;
