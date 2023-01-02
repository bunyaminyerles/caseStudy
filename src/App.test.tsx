import React, {useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {store} from "./redux/store";
import {decrease, increase} from "./redux/cartSlicer";
import FilterComponent from "./components/FilterComponent";
import {IProduct} from "./util/types";


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
}
]


test('product increase in the cart', () => {

    store.dispatch(increase(exampleData[0].id))

    let cart = store.getState().cartState.cart

    expect(cart).toEqual({[exampleData[0].id]: 1})
});

test('product decrease in the cart', () => {

    store.dispatch(increase(exampleData[0].id))
    store.dispatch(increase(exampleData[0].id))
    let cart = store.getState().cartState.cart
    expect(cart).toEqual({[exampleData[0].id]: 2})

    store.dispatch(decrease(exampleData[0].id))
    cart = store.getState().cartState.cart

    expect(cart).toEqual({[exampleData[0].id]: 1})
});

