import { $host } from ".";

export const getEnvQualityByRegionId = async (envQualityId) => {
    const { data } = await $host.get(`api/EnvironmentalQuality/${envQualityId}`)
    return data
}
