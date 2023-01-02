import {Button, Card, Col, message, Modal, Row} from "antd";
import {Dispatch, SetStateAction} from "react";
import {IProduct} from "../util/types";
import {cartSlicer} from "../redux/cartSlicer";
import {useAppDispatch} from "../redux/store";

function ProductDescription({
                                open = false,
                                setOpen,
                                product,
                            }: {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    product?: IProduct
}) {

    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Modal width={'60%'} open={open} onCancel={handleCancel} footer={null}>
            <Card
                style={{marginTop: 30}}
                cover={
                    <img
                        style={{backgroundSize: "cover"}}
                        alt="example"
                        src={product?.image}
                    />}
            >
                <Row>
                    <Col xs={24} sm={24}>
                        <span color={'#1677ff'}
                              style={{
                                  fontSize: '1.4rem',
                                  display: "block",
                                  marginBlockStart: '0.5em',
                                  marginBlockEnd: '0.5em',
                                  marginInlineStart: '0px',
                                  marginInlineEnd: '0px',
                              }}>{product?.name} </span>
                    </Col>
                    <Col xs={24} sm={24}>
                        <span color={'#1677ff'}
                              style={{
                                  color: '#1677ff',
                                  fontSize: '1.2rem',
                                  display: "block",
                                  marginBlockStart: '0.5em',
                                  marginBlockEnd: '0.5em',
                                  marginInlineStart: '0px',
                                  marginInlineEnd: '0px',
                              }}>{product?.price} ₺</span>
                    </Col>
                    <Col xs={24} sm={24}>
                        <span color={'#1677ff'}
                              style={{
                                  fontSize: '1.2rem',
                                  display: "block",
                                  marginBlockStart: '0.5em',
                                  marginBlockEnd: '0.5em',
                                  marginInlineStart: '0px',
                                  marginInlineEnd: '0px',
                              }}>{product?.description} </span>
                    </Col>
                    <Col xs={24} sm={24}>
                        <Button

                            style={{width: '-webkit-fill-available'}}
                            type={'primary'}
                            onClick={() => {
                                if (product?.id != null) {
                                    dispatch(cartSlicer.actions.increase(product?.id))
                                    message.success('Successfully')
                                }
                            }}
                        >
                            ADD TO CART
                        </Button>
                    </Col>

                </Row>
            </Card>
        </Modal>
    )
}

export default ProductDescription;