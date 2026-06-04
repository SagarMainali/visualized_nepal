// all this function are used for getting dashboards data

import { getGoldRates } from "../getGoldRates";
import { getInflationData } from "../getInflationData";
import tourismData from "@/data/tourismData/tourismData.json";

export async function getGoldRatesDataSummary() {
    const data = await getGoldRates();

    return {
        latest: data.at(-1),
        previous: data.at(-2),
    };
}


export async function getInflationDataSummary() {
    const data = await getInflationData();
    const actualData = data.inflationRateData;

    return {
        latest: actualData.at(-1),
        previous: actualData.at(-2),
    };
}

export function getTourismDataSummary() {
    return {
        latest: tourismData.at(-1),
        previous: tourismData.at(-2)
    }
}