import {Button, Card, Checkbox, message, Radio, Space} from "antd";
import {IProduct} from "../util/types";
import {useEffect, useState} from "react";
import {CheckboxValueType} from "antd/es/checkbox/Group";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

function FilterComponent({
                             data,
                             setData
                         }: { data: IProduct[] | undefined, setData: React.Dispatch<React.SetStateAction<IProduct[] | undefined>> }) {

    const {productState} = useSelector((state: RootState) => state);
    const [brands, setBrands] = useState<CheckboxValueType[]>([])
    const [modelsOption, setModelsOption] = useState<CheckboxValueType[]>([])
    const [models, setModels] = useState<CheckboxValueType[]>([])

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
        message.success('Filter applied successfully.')
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
        <>
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
        </>
    )
}

export default FilterComponent