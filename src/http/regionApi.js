import { $host } from ".";

export const getAllRegions = async () => {
    const { data } = await $host.get("api/Region")
    return data
}

export const getAllRegionById = async (id) => {
    const { data } = await $host.get(`api/Region/${id}`)
    return data
}
