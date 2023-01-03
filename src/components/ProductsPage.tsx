import {Button, Card, Col, Drawer, List, Row, Spin} from "antd";
import useGetAllProducts from "../hook/useGetAllProducts";
import {IProduct} from "../util/types";
import {useEffect, useState} from "react";
import ProductDescription from "./ProductDescription";
import {SearchOutlined, ShoppingCartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {RootState, useAppDispatch} from "../redux/store";
import {cartSlicer} from "../redux/cartSlicer";
import {useSelector} from "react-redux";
import FilterComponent from "./FilterComponent";
import CartComponent from "./CartComponent";
import ProductListViewer from "./ProductListViewer";


function ProductsPage() {

    const dispatch = useAppDispatch();
    const {cartState, productState} = useSelector((state: RootState) => state);
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<IProduct[] | undefined>([])
    const [collapseFilter, setCollapseFilter] = useState<boolean>(false)
    const [collapseCart, setCollapseCart] = useState<boolean>(false)

    const [selectedProduct, setSelectedProduct] = useState<IProduct>()

    const {
        isLoading: isLoadingProductsData,
        isFetching: isFetchingProductsData,
    } = useGetAllProducts()

    useEffect(() => {
        if (Object.keys(productState.data).length !== 0) {
            var tmp = 0;
            Object.keys(cartState.cart).map((key: string) => tmp += Number(productState.data[key]?.price) * Number(cartState.cart[key]))
            dispatch(cartSlicer.actions.priceUpdate(tmp))
        }
    }, [cartState])


    const showDrawerFilter = () => {
        setCollapseFilter(true);
    };

    const onCloseFilter = () => {
        setCollapseFilter(false);
    };

    const showDrawerCart = () => {
        setCollapseCart(true);
    };

    const onCloseCart = () => {
        setCollapseCart(false);
    };

    return (

        <Row>
            <Col xs={24} sm={0}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button style={{
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                    }} icon={<SearchOutlined/>} type="primary" onClick={showDrawerFilter}>
                    </Button>
                    <Button style={{
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }} icon={<ShoppingOutlined/>} type="primary" onClick={showDrawerCart}>
                    </Button>
                    <Drawer placement="left" onClose={onCloseFilter} open={collapseFilter}>
                        <FilterComponent data={data} setData={setData}/>
                    </Drawer>
                    <Drawer placement="right" onClose={onCloseCart} open={collapseCart}>
                        <CartComponent/>
                    </Drawer>
                </div>
            </Col>
            <Col style={{marginTop: 50}} xs={0} sm={6}>
                <FilterComponent data={data} setData={setData}/>
            </Col>
            <Col style={{marginTop: 50, display: "flex", justifyContent: "center", alignItems: "center"}} xs={24}
                 sm={12}>

                {(isLoadingProductsData || isFetchingProductsData) ?
                    <Spin/>
                    :
                    <ProductListViewer data={data} open={open} setOpen={setOpen}
                                       setSelectedProduct={setSelectedProduct}></ProductListViewer>
                }
            </Col>
            <Col style={{marginTop: 50}} xs={0} sm={6}>
                <CartComponent/>
            </Col>
            {open ? (
                <Col xs={24} sm={24}>
                    <ProductDescription
                        open={open}
                        setOpen={setOpen}
                        product={selectedProduct}
                    />
                </Col>
            ) : (
                <></>
            )}
        </Row>

    )
}

export default ProductsPage;