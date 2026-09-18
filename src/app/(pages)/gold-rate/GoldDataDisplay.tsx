'use client'

import { useState, useEffect, useMemo } from 'react'
import Loader from '@/components/Loader';
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { dateFormatter, timeIndicator } from '@/helper/formatters';
import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_GoldRate from '@/app/(pages)/gold-rate/CustomTooltip_GoldRate';

const time_DropdownItems = [
    { name: "1 Week", value: 7 },
    { name: "1 Month", value: 30 },
    { name: "3 Months", value: 90 },
    { name: "6 Months", value: 180 },
    { name: "1 Year", value: 360 },
    { name: "Maximum", value: "max" },
]

type GoldDataDisplayProps = {
    initialGoldData: GoldRateDataT[]
}

export default function GoldDataDisplay({ initialGoldData }: GoldDataDisplayProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [filters, setFilters] = useState<GoldPageFiltersT>(() => {
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('gold-rate-page-filters');
            if (localData) {
                try {
                    return JSON.parse(localData);
                } catch (error) {
                    console.error("Failed to parse data from localstorage:", error);
                }
            }
        }
        return { dateType: 'AD', time: 7 }; // Default fallback
    });

    // Mark component as mounted to safely render client-specific UI elements
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sync local storage only when filters actively change after mount
    useEffect(() => {
        localStorage.setItem('gold-rate-page-filters', JSON.stringify(filters));
    }, [filters]);

    // Handlers
    const changeDateTypeInFilter = (dateType: 'AD' | 'BS') => {
        setFilters(prev => ({ ...prev, dateType }));
    };

    const getGoldRatesDataByTime = (time: number | 'max') => {
        setFilters(prev => ({ ...prev, time }));
    };

    const goldRatesDataFiltered = useMemo(() => {
        return filters.time === 'max'
            ? initialGoldData
            : initialGoldData.slice(-filters.time);
    }, [initialGoldData, filters.time]);

    // Prevent Next.js SSR Hydration Errors
    if (!isMounted) {
        return <Loader />;
    }

    const lastItem = goldRatesDataFiltered?.[goldRatesDataFiltered.length - 1];
    const appropriateDate = lastItem?.[filters.dateType === 'AD' ? 'englishDate' : 'nepaliDate'];

    return (
        <div className='h-[90vh] w-full flex flex-col justify-center items-center gap-4'>
            <div className='w-[85%] flex flex-row-reverse gap-2'>
                <CustomDropDown label="Date type" items={["AD", "BS"]} onClickHandler={changeDateTypeInFilter} selectedValue={filters.dateType} />
                <CustomDropDown label="Set time" items={time_DropdownItems} onClickHandler={getGoldRatesDataByTime} selectedValue={filters.time} />
            </div>

            <ResponsiveContainer width="90%" height="70%">
                <LineChart data={goldRatesDataFiltered} margin={{ left: 20, right: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey={filters.dateType === 'AD' ? 'englishDate' : 'nepaliDate'} angle={-45} textAnchor="end" tickMargin={5} />
                    <YAxis domain={['auto', 'auto']} width={60} tickFormatter={(value) => `${(value / 1000)}k`} />
                    <Tooltip content={<CustomTooltip_GoldRate dateType={filters.dateType} />} />
                    <Legend verticalAlign='top' />
                    <Line dataKey="price" stroke="#FFD700" strokeWidth={2} activeDot={{ r: 8 }} dot={false} type="monotone" name='Price' />
                </LineChart>
            </ResponsiveContainer>

            <p className='text-yellow-300 text-[18px]'>Gold price of <strong className='underline'>{timeIndicator(filters.time)}</strong></p>

            <div className='w-[90%] relative flex justify-center'>
                {/* <button className='bg-gray-600 px-4 py-2 rounded font-semibold cursor-pointer text-white shadow hover:scale-105 transition-all duration-200' onClick={() => getGoldRatesDataAll()}>Get latest price</button> */}
                <div className='absolute right-0 top-[50%] -translate-y-[50%] flex flex-col text-[12px] text-gray-600'>
                    <span>
                        Last updated: {dateFormatter(appropriateDate!, 'm/d/y', filters.dateType)}
                    </span>
                    <span>
                        Source: <a href="https://gahanaonline.com/gold-rate-history/" target='_blank' rel="noreferrer noopener" className='underline underline-offset-2'>Gahana Online</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
