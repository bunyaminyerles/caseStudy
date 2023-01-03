import {createSlice, current} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ICartState} from "../util/types";

const initialState = {
    cart: {} as ICartState,
    price: 0 as number
}

export const cartSlicer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increase: (state, {payload}: PayloadAction<string>) => {
            if (state.cart[payload] === undefined) {
                state.cart[payload] = 1;
            } else {
                state.cart[payload] += 1;
            }
        },
        decrease: (state, {payload}: PayloadAction<string>) => {
            if (state.cart[payload] > 1) {
                state.cart[payload] -= 1;
            } else {
                delete state.cart[payload];
            }
        },
        priceUpdate: (state, {payload}: PayloadAction<number>) => {
            state.price = payload
        },
        resetCart: (state) => {
            state.cart = {}
            state.price = 0
        }
    },
})


// Action creators are generated for each case reducer function
export const {increase, decrease, priceUpdate, resetCart} = cartSlicer.actions

export default cartSlicer.reducer