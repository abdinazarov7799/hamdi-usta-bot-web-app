import React from 'react';
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import {get} from "lodash";
import {Typography} from "antd";
const {Title} = Typography;
const ProductContainer = ({category}) => {
    const {data,isLoading} = useGetOneQuery({
        id: get(category,'id'),
        url: URLS.get_product,
        key: `${KEYS.get_product}_${get(category,'id')}`,
    })
    console.log(get(data,'data.data'),get(category,'id'))
    return (
        <div>
            <Title level={4}>{get(category,'name')} :</Title>
            sherda productlar chiqadi
        </div>
    );
};

export default ProductContainer;
