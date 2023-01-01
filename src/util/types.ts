export interface IProduct {
    createdAt: string
    name: string
    image: string
    price: string
    description: string
    model: string
    brand: string
    id: string
}

export interface IProductState {
    [key: string]: IProduct,
}

export interface ICartState {
    [key: string]: number
}