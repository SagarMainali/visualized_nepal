import { getInflationData } from "@/lib/getInflationData";
import InflationDataDisplay from "./InflationDataDisplay";
import { dateFormatter } from '@/helper/formatters';
import InflationLegend from './InflationLegend';

export default async function InflationPage() {
    try {
        const inflationData = await getInflationData();

        return (
            <div className='w-full h-[91vh] flex flex-col items-center gap-6 py-8' >
                <InflationDataDisplay inflationData={inflationData} />

                <p className='text-primary-blue text-[18px]'>Inflation rate in (%) according to Consumer Price Index(CPI)</p>

                <div className='w-[90%] relative flex justify-center'>
                    {/* <button className=' bg-primary-blue px-4 py-2 rounded font-semibold cursor-pointer text-white shadow' onClick={() => getInflationRateData()}>Get latest update</button> */}
                    <div className='absolute right-0 top-[50%] -translate-y-[50%] flex flex-col text-[12px] text-gray-600'>
                        <span>Last updated: {dateFormatter(inflationData.lastUpdated, 'y-m-d')}</span>
                        <span>
                            Source: <a href="https://api.worldbank.org/v2/country/NP/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100" target='_blank' rel="noreferrer noopener" className='underline underline-offset-2'>World Bank</a>
                        </span>
                    </div>
                </div>

                <InflationLegend />
            </div>
        )
    } catch (error) {
        console.error("Failed to fetch inflation data:", error);

        return (
            <div className="p-4 border border-red-500 rounded bg-red-50 text-red-700">
                <p>Unable to load live inflation data right now. Please try again later.</p>
            </div>
        );
    }
}