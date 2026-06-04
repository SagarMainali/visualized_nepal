import axios from "axios";

const inflationData_url = "https://api.worldbank.org/v2/country/NP/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100";

export async function getInflationData(): Promise<InflationRateData_ResponseT> {
    const response = await axios.get(inflationData_url);
    const data = response.data;

    if (response.status !== 200) {
        throw new Error('Unexpected error occured');
    }

    const metaData = data[0];
    const actualData = data[1] as InflationRateDataT[];

    const filteredData = actualData
        .filter((item: any) => item.value !== null)
        .map((item: any) => (
            {
                year: item.date,
                value: item.value.toFixed(1)
            }
        ))

    return {
        lastUpdated: metaData.lastupdated,
        inflationRateData: filteredData.reverse()
    }
}