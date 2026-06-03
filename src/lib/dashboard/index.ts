// all this function are used for getting dashboards data

import { getGoldRates } from "../getGoldRates";
import { getInflationData } from "../getInflationData";

export async function getGoldRatesSummary() {
    const data = await getGoldRates();

    return {
        latest: data.at(-1),
        previous: data.at(-2),
    };
}


export async function getInflationSummary() {
    const data = await getInflationData();
    const actualData = data.inflationRateData;

    return {
        latest: actualData.at(-1),
        previous: actualData.at(-2),
    };
}