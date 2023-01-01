import {useQuery, UseQueryResult} from "react-query";
import axiosInstance from '../util/api'
import {IProduct} from "../util/types";
import {useAppDispatch} from "../redux/store";
import {addAll, addAllFilteredData} from "../redux/productSlicer";

const useGetAllProducts = (): UseQueryResult<IProduct[]> => {
    const dispatch = useAppDispatch();
    const getAllProducts = useQuery("allProducts", async (): Promise<any> => {
        const data = await axiosInstance
            .get(`products`)
            .then((response) => {
                const data = response.data;
                dispatch(addAll(data));
                dispatch(addAllFilteredData(data))
                return data;
            })
            .catch((error) => {
                return null
            });
        return data
    });
    return getAllProducts;
};

export default useGetAllProducts;
