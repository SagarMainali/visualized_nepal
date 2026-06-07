'use client'

import Loader from '@/components/Loader';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceArea } from 'recharts';
import CustomTooltip_InflationRate from '@/app/(pages)/inflation/CustomTooltip_InflationRate';
import CustomActiveDot from '@/app/(pages)/inflation/CustomActiveDot_InflationRate';
import { dateFormatter } from '@/helper/formatters';
import InflationLegend from './InflationLegend';

export default function Inflation() {

    const [inflationRateData_Res, setInflationRateData_Res] = useState<InflationRateData_ResponseT | null>(null);

    const getInflationRateData = async () => {
        try {
            setInflationRateData_Res(null);
            const { data } = await axios.get('/api/inflation');
            setInflationRateData_Res(data);
        } catch (error) {
            console.error("Failed to fetch 'Inflation rate' data:", error);
        }
    }

    // fetch the data initially
    useEffect(() => {
        getInflationRateData();
    }, [])

    return (
        inflationRateData_Res
            ? (
                <div className='w-full h-[91vh] flex flex-col items-center gap-6 py-8' >
                    <ResponsiveContainer width="90%" height="100%">
                        <LineChart data={inflationRateData_Res.inflationRateData} margin={{ bottom: 20 }}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="year" angle={-45} textAnchor="end" tickMargin={5} />
                            <YAxis tickFormatter={(value) => `${(value)}%`} domain={[-5, 20]} scale="linear" />
                            <Tooltip content={<CustomTooltip_InflationRate />} />
                            <Legend verticalAlign='top' height={30} />
                            <Line dataKey="value" stroke="#155dfc " strokeWidth={2} activeDot={<CustomActiveDot />} dot={false} type="monotone" name='Rate' />
                            <ReferenceArea y1={1} y2={3} fill='green' fillOpacity={0.2} />
                        </LineChart>
                    </ResponsiveContainer>

                    <p className='text-primary-blue text-[18px]'>Inflation rate in (%) according to Consumer Price Index(CPI)</p>

                    <div className='w-[90%] relative flex justify-center'>
                        <button className=' bg-primary-blue px-4 py-2 rounded font-semibold cursor-pointer text-white shadow' onClick={() => getInflationRateData()}>Get latest update</button>
                        <div className='absolute right-0 top-[50%] -translate-y-[50%] flex flex-col text-[12px] text-gray-600'>
                            <span>Last updated: {dateFormatter(inflationRateData_Res.lastUpdated, 'y-m-d')}</span>
                            <span>
                                Source: <a href="https://api.worldbank.org/v2/country/NP/indicator/FP.CPI.TOTL.ZG?format=json&per_page=100" target='_blank' rel="noreferrer noopener" className='underline underline-offset-2'>World Bank</a>
                            </span>
                        </div>
                    </div>

                    <InflationLegend />
                </div>
            )
            : <Loader />
    )
}
