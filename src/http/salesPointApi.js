import { $host } from ".";

export const getSalesPointByRegionId = async (regionId) => {
    const { data } = await $host.get(`api/SalesPoint/region?regionId=${regionId}`)
    return data
}
