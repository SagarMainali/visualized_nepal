'use client'

import Loader from '@/components/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import CustomTooltip_InflationRate from '@/components/customRecharts/CustomTooltip_InflationRate';
import CustomActiveDot from '@/components/customRecharts/customActiveDot';
import { dateFormatter } from '@/helper/formatters';

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
                <div className='h-full w-full flex flex-col justify-center items-center gap-4' >
                    <ResponsiveContainer width="90%" height="75%">
                        <LineChart data={inflationRateData_Res.inflationRateData} margin={{ bottom: 20 }}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="year" angle={-45} textAnchor="end" tickMargin={5} />
                            <YAxis tickFormatter={(value) => `${(value)}%`} domain={[-5, 20]} scale="linear" />
                            <Tooltip content={<CustomTooltip_InflationRate />} />
                            <Legend verticalAlign='top' height={30} />
                            <Line dataKey="value" stroke="#155dfc " strokeWidth={2} activeDot={<CustomActiveDot />} dot={false} type="monotone" name='Rate' />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className='text-primary-blue text-[18px]'>Inflation rate in (%) according to Consumer Price Index(CPI)</p>
                    <div className='w-[80%] relative flex justify-center'>
                        <button className=' bg-primary-blue px-4 py-2 rounded font-semibold cursor-pointer text-white shadow' onClick={() => getInflationRateData()}>Get latest update</button>
                        <span className='text-[12px] text-gray-600 absolute right-0 top-[50%] -translate-y-[50%]'>Last updated: {dateFormatter(inflationRateData_Res.lastUpdated, 'y-m-d')}</span>
                    </div>
                </div>
            )
            : <Loader />
    )
}
