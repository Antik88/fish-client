import { $host } from ".";

export const getAllRegions = async () => {
    const { data } = await $host.get("api/Region")
    return data
}

