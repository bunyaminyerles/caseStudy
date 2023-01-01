import {Avatar, Button, Card, Checkbox, Col, List, message, Radio, Row, Select, Space, Tag} from "antd";
import useGetAllProducts from "../hook/useGetAllProducts";
import {ICartState, IProduct} from "../util/types";
import {useEffect, useState} from "react";
import ProductDescription from "./ProductDescription";
import {MinusOutlined, PlusOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {RootState, useAppDispatch} from "../redux/store";
import {cartSlicer, priceUpdate} from "../redux/cartSlicer";
import {useSelector} from "react-redux";
import VirtualList from 'rc-virtual-list';
import {addAll, addAllFilteredData} from "../redux/productSlicer";
import {CheckboxValueType} from "antd/es/checkbox/Group";

const gridStyle: React.CSSProperties = {
    width: '100%',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 0
};

function ProductsPage() {

    const dispatch = useAppDispatch();
    const {cartState, productState} = useSelector((state: RootState) => state);
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<IProduct[] | undefined>([])
    const [brands, setBrands] = useState<CheckboxValueType[]>([])
    const [modelsOption, setModelsOption] = useState<CheckboxValueType[]>([])
    const [models, setModels] = useState<CheckboxValueType[]>([])
    const [selectedProduct, setSelectedProduct] = useState<IProduct>()

    const {
        isLoading: isLoadingProductsData,
        isFetching: isFetchingProductsData,
    } = useGetAllProducts()

    useEffect(() => {
        var tmp = 0;
        Object.keys(cartState.cart).map((key: string) => tmp += Number(productState.data[key]?.price) * Number(cartState.cart[key]))
        dispatch(priceUpdate(tmp))
    }, [cartState])

    const showDetail = (product: IProduct) => {
        setOpen(!open);
        setSelectedProduct(product)
    }

    useEffect(() => {
        setModelsOption(
            [...new Set(productState.filteredData?.filter((item) => brands.includes(item.brand)).map((item: any) => item.model))]
        )
    }, [brands])

    useEffect(() => {
        setModels([])
        setBrands([])
        setData(productState.filteredData)
    }, [productState.filteredData])

    const applyFilter = () => {
        if (models.length > 0) {
            const tmp = productState.filteredData?.filter((item: IProduct) =>
                models.includes(item.model)
            )
            setData(tmp)
        } else if (brands.length > 0) {
            const tmp = productState.filteredData?.filter((item) => brands.includes(item.brand))
            setData(tmp)
        } else {
            setData(productState.filteredData)
        }
    }

    const onChangeSortBy = (value: any) => {
        if (value === 'oldToNew') {
            const newData = [...data ?? []].sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
            setData(newData)
        } else if (value === 'newToOld') {
            const newData = [...data ?? []].sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))
            setData(newData)
        } else if (value === 'lowToHigh') {
            const newData = [...data ?? []].sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            setData(newData)
        } else if (value === 'highToLow') {
            const newData = [...data ?? []].sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
            setData(newData)
        }
    }

    return (

        <Row>
            <Col style={{marginTop: 50}} xs={0} sm={6}>
                <Card title={'Sort by'}>
                    <Radio.Group onChange={(value) => {
                        onChangeSortBy(value.target.value)
                    }}>
                        <Space direction={'vertical'}>
                            <Radio value={'oldToNew'}>Old to new</Radio>
                            <Radio value={'newToOld'}>New to old</Radio>
                            <Radio value={'highToLow'}>Price high to low</Radio>
                            <Radio value={'lowToHigh'}>Price low to high</Radio>
                        </Space>
                    </Radio.Group>
                </Card>
                <Card title={'Brands'} style={{height: 200, overflow: 'auto', marginTop: 20}}>
                    <Checkbox.Group value={brands} onChange={(value) => {
                        setBrands(value)
                    }}>
                        <Space direction={'vertical'}>
                            {[...new Set(productState.filteredData?.map((item: any) => item.brand))].map((item) =>
                                <Checkbox value={item}>{item}</Checkbox>)}
                        </Space>
                    </Checkbox.Group>
                </Card>
                <Card title={'Models'} style={{height: 200, overflow: 'auto', marginTop: 20}}>
                    <Checkbox.Group value={models} onChange={(value) => {
                        setModels(value)
                    }}>
                        <Space direction={'vertical'}>
                            {modelsOption.map((item) =>
                                <Checkbox value={item}>{item}</Checkbox>)}
                        </Space>
                    </Checkbox.Group>
                </Card>
                <Card bodyStyle={{display: "flex", justifyContent: "center"}}>
                    <Button type={"primary"} onClick={() => applyFilter()}> Apply Filter </Button>
                </Card>
            </Col>
            <Col style={{marginTop: 50}} xs={24} sm={12}>

                <Card>
                    <List
                        loading={isLoadingProductsData || isFetchingProductsData}
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
            </Col>
            <Col style={{marginTop: 50}} xs={0} sm={6}>
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