// all this function are used for getting dashboards data

import { getGoldRates } from "../getGoldRates";
import { getInflationData } from "../getInflationData";
import { getTourismData } from "../getTourismData";
import { getVegetablesDataForDashboard } from "../vegetables";

export type GoldSummary = Awaited<ReturnType<typeof getGoldRatesDataSummary>>;

export type InflationSummary = Awaited<ReturnType<typeof getInflationDataSummary>>;

export type TourismSummary = ReturnType<typeof getTourismDataSummary>;

export type VegetableSummary = Awaited<ReturnType<typeof getVegetablesDataSummary>>;

export async function getGoldRatesDataSummary() {
    const data = await getGoldRates();

    const latest = data.at(-1);
    const previous = data.at(-2);

    const percentChange =
        previous && latest
            ? ((latest.price - previous.price) / previous.price) * 100
            : 0;

    return {
        latest,
        previous,
        percentChange,
    };
}


export async function getInflationDataSummary() {
    const data = await getInflationData();
    const actualData = data.inflationRateData;

    const latest = actualData.at(-1);
    const previous = actualData.at(-2);

    const percentChange = latest && previous
        ? latest.value - previous.value
        : 0;

    return {
        latest,
        previous,
        percentChange
    };
}

export function getTourismDataSummary() {
    const data = getTourismData();

    const latest = data.at(-1);
    const previous = data.at(-2);

    return {
        latest,
        previous,
        percentChange: latest?.annualGrowthRate ?? 0
    };
}

export async function getVegetablesDataSummary() {
    const data = await getVegetablesDataForDashboard();
    return data;
}