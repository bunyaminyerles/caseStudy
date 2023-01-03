import React, {useEffect, useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {useAppDispatch} from "./redux/store";
import {cartSlicer, decrease, increase, resetCart} from "./redux/cartSlicer";
import FilterComponent from "./components/FilterComponent";
import {IProduct} from "./util/types";
import {Provider} from "react-redux";
import {addAll, addAllFilteredData, resetProduct} from "./redux/productSlicer";
import userEvent from "@testing-library/user-event";
import {testStore} from "./redux/store.test";
import HeaderComponent from "./components/HeaderComponent";
import {Layout} from "antd";

beforeEach(() => {
    testStore.dispatch(resetCart())
    testStore.dispatch(resetProduct())
    testStore.dispatch(addAll(exampleData))
    testStore.dispatch(addAllFilteredData(exampleData))
});

export let filterData: IProduct[] | undefined;

export function HeaderComponentMock() {
    return (<Layout>
        <Layout.Header style={{backgroundColor: '#1677ff'}}>
            <HeaderComponent/>
        </Layout.Header>
    </Layout>)
}

export function FilterComponentMock() {
    const [newData, setNewData] = useState<IProduct[] | undefined>
    (exampleData);
    useEffect(() => {
        filterData = newData;
    }, [newData])
    return (<FilterComponent data={newData} setData={setNewData}/>)
}


const exampleData = [{
    createdAt: "2022-03-30T05:50:53.201Z",
    name: "Polestar Golf",
    image: "http://placeimg.com/640/480/sports",
    price: "802.00",
    description: "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
    model: "Roadster",
    brand: "Tesla",
    id: "1"
}, {
    createdAt: "2022-03-30T10:08:52.378Z",
    name: "Hyundai Volt",
    image: "http://placeimg.com/640/480/animals",
    price: "664.00",
    description: "Id accusamus voluptatem. Dolore ab nemo similique iure eligendi similique quae exercitationem ad. Provident repellendus nesciunt fugit. Optio aliquam ex dolorem pariatur veniam.\n \rMagnam necessitatibus quia voluptatibus inventore voluptatum. Nobis sint omnis dignissimos atque error. Est quibusdam ad.\n \rEt amet nisi officiis pariatur ea voluptate nisi cumque et. Vel voluptatem nostrum fugit accusamus id voluptas. Aspernatur dolorem non ullam nihil inventore nostrum hic. Dolores esse labore. Animi sunt neque aut. Quod quas dolorem voluptas corrupti laborum aut.",
    model: "Grand Cherokee",
    brand: "Polestar",
    id: "2"
}, {
    createdAt: "2022-03-29T21:25:22.572Z",
    name: "Fiat Colorado",
    image: "http://placeimg.com/640/480/people",
    price: "696.00",
    description: "Excepturi vel fugit. Nihil tenetur est maxime delectus suscipit repellendus id vel quia. Excepturi officiis veritatis voluptatum aliquid ut ut dignissimos iste. Accusamus sint qui quisquam qui nostrum ut tempora minima odit. Cum maxime aliquam sed sapiente reprehenderit illo eum molestiae. Doloribus necessitatibus non et.\n \rRerum facere laudantium sit fugiat laudantium voluptas iusto mollitia et. Aut qui voluptatum voluptas. Ab numquam voluptas temporibus et culpa optio voluptate. Minima officiis ducimus aut.\n \rDolorem est nihil exercitationem. Sapiente ipsam magni. Tenetur ut tempora aperiam dolores. Iure animi hic commodi et similique blanditiis. Nostrum recusandae blanditiis qui doloremque.",
    model: "Explorer",
    brand: "Tesla",
    id: "6"
},
]

test('product increase in the cart', () => {

    testStore.dispatch(increase(exampleData[0].id))

    let cart = testStore.getState().cartState.cart

    expect(cart).toEqual({[exampleData[0].id]: 1})
});

test('product decrease in the cart', () => {

    testStore.dispatch(increase(exampleData[0].id))
    testStore.dispatch(increase(exampleData[0].id))
    let cart = testStore.getState().cartState.cart
    expect(cart).toEqual({[exampleData[0].id]: 2})

    testStore.dispatch(decrease(exampleData[0].id))
    cart = testStore.getState().cartState.cart

    expect(cart).toEqual({[exampleData[0].id]: 1})
});

test('brands filter render test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const checkBox = screen.getByTestId(exampleData[0].brand);
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();
})

test('brands filter functionality test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const checkBox = screen.getByTestId(exampleData[0].brand);
    userEvent.click(checkBox);
    // @ts-ignore
    fireEvent.click(screen.queryByTestId('applyFilter'))
    expect(filterData?.length).toEqual(exampleData.filter((item: IProduct) => item.brand === exampleData[0].brand).length)
})

test('models filter render test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const brandCheckBox = screen.getByTestId(exampleData[0].brand);
    userEvent.click(brandCheckBox);
    const modelCheckBox = screen.getByTestId(exampleData[0].model);
    expect(modelCheckBox).toBeInTheDocument();
    expect(modelCheckBox).not.toBeChecked();
})

test('models filter functionality test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const brandCheckBox = screen.getByTestId(exampleData[0].brand);
    userEvent.click(brandCheckBox);
    const modelCheckBox = screen.getByTestId(exampleData[0].model);
    userEvent.click(modelCheckBox);
    // @ts-ignore
    fireEvent.click(screen.queryByTestId('applyFilter'))
    expect(filterData?.length).toEqual(exampleData.filter((item: IProduct) => item.model === exampleData[0].model).length)
})

test('old to new render test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const oldToNew = screen.getByTestId('oldToNew');
    expect(oldToNew).toBeInTheDocument();
    expect(oldToNew).not.toBeChecked();
})

test('new to old render test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const newToOld = screen.getByTestId('newToOld');
    expect(newToOld).toBeInTheDocument();
    expect(newToOld).not.toBeChecked();
})

test('low to high render test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const lowToHigh = screen.getByTestId('lowToHigh');
    expect(lowToHigh).toBeInTheDocument();
    expect(lowToHigh).not.toBeChecked();
})

test('high to low render test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const highToLow = screen.getByTestId('highToLow');
    expect(highToLow).toBeInTheDocument();
    expect(highToLow).not.toBeChecked();
})

test('old to new sorting test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const oldToNew = screen.getByTestId('oldToNew');
    userEvent.click(oldToNew);

    expect(filterData ? filterData[0] : []).toEqual(exampleData[2])
    expect(filterData ? filterData[1] : []).toEqual(exampleData[0])
    expect(filterData ? filterData[2] : []).toEqual(exampleData[1])
})

test('new to old sorting test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const newToOld = screen.getByTestId('newToOld');
    userEvent.click(newToOld);

    expect(filterData ? filterData[0] : []).toEqual(exampleData[1])
    expect(filterData ? filterData[1] : []).toEqual(exampleData[0])
    expect(filterData ? filterData[2] : []).toEqual(exampleData[2])
})

test('low to high sorting test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const lowToHigh = screen.getByTestId('lowToHigh');
    userEvent.click(lowToHigh);

    expect(filterData ? filterData[0] : []).toEqual(exampleData[1])
    expect(filterData ? filterData[1] : []).toEqual(exampleData[2])
    expect(filterData ? filterData[2] : []).toEqual(exampleData[0])
})

test('high to low sorting test', () => {
    render(<Provider store={testStore}><FilterComponentMock/> </Provider>);
    const highToLow = screen.getByTestId('highToLow');
    userEvent.click(highToLow);

    expect(filterData ? filterData[0] : []).toEqual(exampleData[0])
    expect(filterData ? filterData[1] : []).toEqual(exampleData[2])
    expect(filterData ? filterData[2] : []).toEqual(exampleData[1])
})