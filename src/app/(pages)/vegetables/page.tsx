'use client'

import Loader from '@/components/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, Brush, Label } from 'recharts';
import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Vegetables from './CustomTooltip_Vegetables';
import { commodities } from './vegetablesList';
import CustomActiveDot from './CustomActiveDot';

export default function Vegetables() {

    const [rangedDate_SingleVegetable, setRangedDate_SingleVegetable] = useState<RangedDate_SingleVegetable_ForChartT[] | null>(null);

    const [selectedVegetable, setSelectedVegetable] = useState('Tomato Big(Nepali)');

    // get selected vegetable data of all time
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/api/vegetables/${selectedVegetable}`);
            setRangedDate_SingleVegetable(data);
        })();
    }, [selectedVegetable])

    return (
        rangedDate_SingleVegetable
            ? (
                <div className='h-full w-full flex flex-col justify-center items-center gap-2'>
                    <div className='w-[85%] flex justify-end items-center gap-2'>
                        <span>Select Vegetable:</span>
                        <CustomDropDown items={commodities} label={selectedVegetable} onClickHandler={setSelectedVegetable} selectedValue={selectedVegetable} arrowIcon={true} />
                    </div>
                    {rangedDate_SingleVegetable.length !== 0
                        ? <>
                            <ResponsiveContainer width="100%" height="80%">
                                <LineChart data={rangedDate_SingleVegetable} margin={{ bottom: 20, left: 85, right: 85 }}>
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis dataKey="date" angle={-45} textAnchor="end" tickMargin={5} height={120} >
                                        <Label value="Date" position="insideBottom" />
                                    </XAxis >
                                    <YAxis label={{ value: 'Price range', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip content={<CustomTooltip_Vegetables />} />
                                    <Legend verticalAlign='top' height={30} />
                                    <Line dataKey="average" stroke="#67AE6E " strokeWidth={2} dot={false} activeDot={<CustomActiveDot />} type="monotone" name='Price trend' />
                                    <Brush dataKey="date" height={30} stroke="#67AE6E" />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className='text-[#67AE6E]'>Price trend of '{selectedVegetable}'</p>
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
