import {Button, Card, List} from "antd";
import {IProduct} from "../util/types";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {cartSlicer} from "../redux/cartSlicer";
import useGetAllProducts from "../hook/useGetAllProducts";
import {useAppDispatch} from "../redux/store";
import React, {Dispatch, SetStateAction} from "react";

const gridStyle: React.CSSProperties = {
    width: '100%',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 0
};

function ProductListViewer({
                               data,
                               open,
                               setOpen,
                               setSelectedProduct
                           }: {
    data: IProduct[] | undefined
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setSelectedProduct: Dispatch<SetStateAction<IProduct | undefined>>
}) {

    const dispatch = useAppDispatch();



    const showDetail = (product: IProduct) => {
        setOpen(!open);
        setSelectedProduct(product)
    }

    return (
        <Card>
            <List
                style={{display: 'fixed'}}
                grid={{

                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 3,
                    xxl: 3
                }}
                pagination={{defaultPageSize: 12}}
                dataSource={data}
                renderItem={(item: IProduct) => (
                    <List.Item>
                        <Card
                            cover={
                                <img
                                    onClick={() => showDetail(item)}
                                    alt="example"
                                    src={item.image}
                                />
                            }
                            actions={[
                                <Button
                                    id={item.id}
                                    icon={<ShoppingCartOutlined/>}
                                    size={'middle'}
                                    block={true}
                                    type={'primary'}
                                    onClick={() => {
                                        dispatch(cartSlicer.actions.increase(item.id))
                                    }}
                                >
                                    ADD TO CART
                                </Button>
                            ]}
                        >
                            <Card.Grid style={gridStyle}>
                    <span color={'#1677ff'}
                          style={{
                              color: '#1677ff',
                              fontSize: '1.2rem',
                              display: "block",
                              marginBlockStart: '0.5em',
                              marginBlockEnd: '0.5em',
                              marginInlineStart: '0px',
                              marginInlineEnd: '0px',
                          }}
                          onClick={() => showDetail(item)}>{item.price} ₺</span>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} onClick={() => showDetail(item)}><p>{item.name}</p>
                            </Card.Grid>
                        </Card>
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default ProductListViewer