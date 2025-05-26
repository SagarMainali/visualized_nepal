import { NextResponse } from "next/server";
import axios from "axios";

const inflationData_url = "https://api.worldbank.org/v2/country/NP/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100";

export async function GET() {
    try {
        const { data } = await axios.get(inflationData_url);

        const metaData = data[0];
        const actualData = data[1];

        const filteredData = actualData
            .filter((item: any) => item.value !== null)
            .map((item: any) => (
                {
                    year: item.date,
                    value: item.value.toFixed(1)
                }
            ))

        return NextResponse.json({ lastUpdated: metaData.lastupdated, inflationRateData: filteredData.reverse() }, { status: 200 });
    } catch (error) {
        console.log("Unable to fetch data!");
        return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to fetch data!" }, { status: 500 });
    }

}