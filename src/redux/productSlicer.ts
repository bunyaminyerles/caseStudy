import {createSlice, current} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IProduct, IProductState} from "../util/types";
import {stat} from "fs";


const initialState = {
    data: {} as IProductState,
    filteredData: [] as IProduct[] | undefined,
    filterByBrand: [] as string[],
    filterByModel: [] as string[],
    filterByWord: [] as string[],
    sortBy: '' as string
}

export const productSlicer = createSlice({
    name: 'productState',
    initialState,
    reducers: {
        add: (state, {payload}: PayloadAction<IProduct>) => {
            state.data = {...state.data, [payload.id]: payload}
        },
        addAll: (state, {payload}: PayloadAction<IProduct[] | undefined>) => {
            payload?.forEach((item: IProduct) => {
                state.data[item.id] = item
            });
        },
        remove: (state, {payload}: PayloadAction<string>) => {
            const {[payload]: a, ...rest} = state.data;
            state.data = rest;
        },
        addAllFilteredData: (state, {payload}: PayloadAction<IProduct[] | undefined>) => {
            state.filteredData = payload;
        },
        filterByWordData: (state, {payload}: PayloadAction<string>) => {
            state.filteredData = Object.values(state.data)?.filter((item: IProduct) =>
                item.name.search(payload) > -1
            )
        }

    }
})

export const {add, remove, addAll, addAllFilteredData, filterByWordData} = productSlicer.actions

export default productSlicer.reducer