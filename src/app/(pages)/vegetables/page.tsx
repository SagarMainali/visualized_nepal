'use client'

import Loader from '@/components/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, Brush } from 'recharts';
import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Vegetables from '@/app/(pages)/vegetables/customTooltip_Vegetables';

export default function Vegetables() {
    const [rangedDate_AllVegetables, setRangedDate_AllVegetables] = useState<RangedDate_AllVegetablesT | null>(null);

    const [rangedDate_SingleVegetable, setRangedDate_SingleVegetable] = useState<RangedDate_SingleVegetable_ForChartT[] | null>(null);

    const [selectedVegetable, setSelectedVegetable] = useState('Tomato Big(Indian)');

    const formatPriceForChart = (price: string) => parseFloat(parseInt(price.split(' ')[1]).toFixed(1));

    // get all vegetables data of all time
    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/vegetables');
            setRangedDate_AllVegetables(data);
        })();
    }, [])

    // set vegetable data for chart
    useEffect(() => {
        if (rangedDate_AllVegetables) {
            (async () => {
                try {
                    const individualVegetableData_ByDate = rangedDate_AllVegetables.map((singleDate_AllVegetables: SingleDate_AllVegetablesT) => {
                        const { date, vegetablesData } = singleDate_AllVegetables;

                        const vegetableData = vegetablesData.find(vd => vd.commodity === selectedVegetable);

                        if (vegetableData) {
                            const { minimum, maximum, average } = vegetableData;

                            return {
                                date,
                                ...vegetableData,
                                minimum: formatPriceForChart(minimum),
                                maximum: formatPriceForChart(maximum),
                                average: formatPriceForChart(average)
                            }
                        }
                    })

                    // filter out unavailable datas for particular dates
                    setRangedDate_SingleVegetable(individualVegetableData_ByDate.filter(ivd => ivd !== undefined));

                } catch (error) {
                    console.log('Failed to fetch vegetables data!', error);
                }
            })();
        }
    }, [rangedDate_AllVegetables, selectedVegetable])

    return (
        rangedDate_AllVegetables && rangedDate_SingleVegetable
            ? (
                <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
                    <div className='w-[90%] flex justify-end items-center gap-2'>
                        <span>Select Vegetable:</span>
                        <CustomDropDown items={rangedDate_AllVegetables[0].vegetablesData.map(vd => vd.commodity)} label={selectedVegetable} onClickHandler={setSelectedVegetable} selectedValue={selectedVegetable} arrowIcon={true} />
                    </div>
                    {rangedDate_SingleVegetable.length !== 0
                        ? <>
                            <ResponsiveContainer width="90%" height="75%">
                                <LineChart data={rangedDate_SingleVegetable} margin={{ bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="date" angle={-45} textAnchor="end" tickMargin={5} height={100} />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip_Vegetables />} />
                                    <Legend verticalAlign='top' height={30} />
                                    <Line dataKey="average" stroke="#67AE6E " strokeWidth={2} dot={false} activeDot={{ r: 6 }} type="monotone" name='Price' />
                                    <Brush dataKey="year" height={30} stroke="#67AE6E" />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className='text-[#67AE6E] text-[18px]'>Price trend of {selectedVegetable}</p>
                            <div className='w-[80%] relative flex justify-center'>
                                <span className='text-[12px] text-[#67AE6E] absolute right-0 top-[50%] -translate-y-[50%]'>Last updated: {rangedDate_SingleVegetable[rangedDate_SingleVegetable.length - 1]?.date}</span>
                            </div>
                        </>
                        : <div className='h-[85%] flex items-center'>
                            <p className='italic'>Chart couldn't be rendered as data for '{selectedVegetable}' is not available! Please select another vegetable.</p>
                        </div>
                    }
                </div>
            )
            : <Loader />
    )
}
