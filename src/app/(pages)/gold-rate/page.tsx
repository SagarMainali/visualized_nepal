'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '@/components/Loader';
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { dateFormatter, timeIndicator } from '@/helper/formatters';
import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_GoldRate from '@/components/customRecharts/CustomTooltip_GoldRate';

export default function GoldRate() {

    const [goldRatesDataAll, setGoldRatesDataAll] = useState<GoldRateDataT[] | null>(null);
    const [goldRatesDataFiltered, setGoldRatesDataFiltered] = useState<GoldRateDataT[] | null>(null); // sliced array according to time in days
    const [filters, setFilters] = useState<GoldPageFiltersT>({
        dateType: 'AD',
        time: 7
        // default filters
    })

    // const [filtersLoaded, setFiltersLoaded] = useState(false);

    // check localstorage to set filters if available
    useEffect(() => {
        const localData = localStorage.getItem('gold-rate-page-filters');
        if (localData) {
            try {
                const parsedData = JSON.parse(localData);
                setFilters(parsedData);
            } catch (error) {
                console.log("Failed to parse data from localstorage:", error);
            }
        }
        // setFiltersLoaded(true);
    }, [])

    const getGoldRatesDataAll = async () => {
        try {
            setGoldRatesDataFiltered(null);
            const { data } = await axios.get('/api/gold-rate');
            setGoldRatesDataAll(data);
        } catch (error) {
            console.error('Failed to fetch gold rate data:', error);
        }
    }

    const changeDateTypeInFilter = (dateType: 'AD' | 'BS') => {
        setFilters(prev => (
            {
                ...prev,
                dateType
            }
        ))
    }

    const getGoldRatesDataByTime = (time: number | 'max') => {
        console.log('key-value -> ', time)
        if (goldRatesDataAll) {
            setGoldRatesDataFiltered(time === 'max' ? goldRatesDataAll : goldRatesDataAll.slice(-time));
            setFilters(prev => (
                {
                    ...prev,
                    time
                }
            ))
        }
    }

    // fetch the data initially
    useEffect(() => {
        getGoldRatesDataAll();
    }, [])

    // after fetching the data, slice the data according to filter
    useEffect(() => {
        if (goldRatesDataAll) {
            getGoldRatesDataByTime(filters.time);
        }
    }, [goldRatesDataAll])

    useEffect(() => {
        localStorage.setItem('gold-rate-page-filters', JSON.stringify(filters));
    }, [filters])

    const time_DropdownItems = [
        {
            name: "1 Week",
            value: 7
        },
        {
            name: "1 Month",
            value: 30
        },
        {
            name: "3 Months",
            value: 90
        },
        {
            name: "6 Months",
            value: 180
        },
        {
            name: "1 Year",
            value: 360
        },
        {
            name: "Maximum",
            value: "max"
        },
    ]

    const lastItem = goldRatesDataFiltered?.[goldRatesDataFiltered.length - 1];
    const appropriateDate = lastItem?.[filters.dateType === 'AD' ? 'englishDate' : 'nepaliDate'];

    return (
        goldRatesDataFiltered
            ? (
                <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
                    <div className='w-[90%] flex flex-row-reverse gap-2'>

                        <CustomDropDown label="Date type" items={["AD", "BS"]} onClickHandler={changeDateTypeInFilter} filteredValue={filters.dateType} />

                        <CustomDropDown label="Set time" items={time_DropdownItems} onClickHandler={getGoldRatesDataByTime} filteredValue={filters.time} />

                    </div>
                    <ResponsiveContainer width="90%" height="70%">
                        <LineChart data={goldRatesDataFiltered} margin={{ right: 10, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey={filters.dateType === 'AD' ? 'englishDate' : 'nepaliDate'} angle={-45} textAnchor="end" tickMargin={5} />
                            <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `${(value / 1000)}k`} />
                            <Tooltip content={<CustomTooltip_GoldRate dateType={filters.dateType} />} />
                            <Legend verticalAlign='top' />
                            <Line dataKey="price" stroke="#FFD700" strokeWidth={2} activeDot={{ r: 8 }} dot={false} type="monotone" name='Price' />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className='text-golden text-[18px]'>Gold price of <strong className='underline'>{timeIndicator(filters.time)}</strong></p>
                    <div className='w-[90%] relative flex justify-center'>
                        <button className='bg-primary-blue px-4 py-2 rounded font-semibold cursor-pointer text-white shadow' onClick={() => getGoldRatesDataAll()}>Get latest price</button>
                        <span className='text-[12px] text-gray-600 absolute right-0 top-[50%] -translate-y-[50%]'>
                            Last updated: {dateFormatter(appropriateDate!, 'm/d/y', filters.dateType)}
                        </span>
                    </div>
                </div>
            )
            : <Loader />
    )
}
