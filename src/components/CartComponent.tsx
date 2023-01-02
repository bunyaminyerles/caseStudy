import {Avatar, Button, Card, List} from "antd";
import VirtualList from "rc-virtual-list";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {cartSlicer} from "../redux/cartSlicer";
import {RootState, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";

function CartComponent() {

    const dispatch = useAppDispatch();
    const {cartState, productState} = useSelector((state: RootState) => state);

    return (
        <>
            <Card title={'Cart'} style={{height: 500, overflow: "auto"}}>
                <List>
                    <VirtualList
                        data={Object.keys(cartState.cart)}
                        height={500}
                        itemHeight={47}
                        itemKey="cart"
                    >
                        {(item: string) => (
                            <List.Item key={item}>
                                <Avatar src={productState.data[item]?.image}/>
                                <p>{productState.data[item]?.name} <br/>{productState.data[item]?.price} ₺</p>
                                <div style={{display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                                    <Button icon={<PlusOutlined/>} type={'primary'}
                                            style={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                            onClick={() => {
                                                dispatch(cartSlicer.actions.increase(productState.data[item]?.id))
                                            }}></Button>
                                    <Card style={{
                                        padding: 0,
                                        height: 32,
                                        width: 32,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                        fontSize: '1.1rem',
                                        borderRadius: 0
                                    }}>{cartState.cart[item]}</Card>
                                    <Button icon={<MinusOutlined/>} type={'primary'}
                                            style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                            onClick={() => {
                                                dispatch(cartSlicer.actions.decrease(productState.data[item]?.id))
                                            }}></Button>
                                </div>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </Card>
            <Card title={'Checkout'} style={{marginTop: 10}}>
                <p style={{color: '#1677ff', fontSize: "1.1rem"}}>Total Price : {cartState.price} ₺</p>
            </Card>
        </>
    )
}

export default CartComponent