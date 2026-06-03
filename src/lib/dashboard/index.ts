import { getGoldRates } from "../getGoldRates";

export async function getGoldRatesSummary() {
    const data = await getGoldRates();

    return {
        latest: data.at(-1),
        previous: data.at(-2),
    };
}
