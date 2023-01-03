import {UserOutlined, WalletOutlined} from "@ant-design/icons";
import {Col, Row, Input, Space} from "antd";
import React from "react";
import {RootState, useAppDispatch} from "../redux/store";
import {filterByWordData} from "../redux/productSlicer";
import {useSelector} from "react-redux";

const {Search} = Input;

function HeaderComponent() {
    const {cartState} = useSelector((state: RootState) => state);

    const dispatch = useAppDispatch();
    const onSearch = (value: string) => dispatch(filterByWordData(value));
    return (
        <Row style={{height: '100%'}}>
            <Col xs={0} sm={4}>
                <span style={{color: '#FFF', fontSize: 'large'}}> Eteration </span>
            </Col>
            <Col xs={8} sm={12} style={{display: 'flex', alignItems: 'center'}}>
                <Input.Search placeholder='Search' onSearch={onSearch} allowClear data-testid={'search'}/>
            </Col>
            <Col xs={16} sm={8}>

                <Space style={{marginLeft: 50, color: '#FFFFFF'}}><WalletOutlined
                    style={{marginRight: 10, color: '#FFFFFF'}}/>{cartState.price} ₺

                    <UserOutlined
                        style={{marginRight: 10, marginLeft: 10, color: '#FFFFFF'}}/>Ali</Space>
            </Col>
        </Row>
    )
}

export default HeaderComponent;