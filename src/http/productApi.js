import { $host } from ".";

export const getAllProducts = async () => {
    const { data } = await $host.get("api/Product")
    return data
}

export const getAllProductsByName = async (name) => {
    const { data } = await $host.get(`api/Product/search?name=${name}`)
    return data
}

export const getProductById = async (id) => {
    const { data } = await $host.get(`api/Product/${id}`)
    return data
}

export const getProductsByRegionId = async (id) => {
    const { data } = await $host.get(`api/Product/region/${id}`)
    return data
}