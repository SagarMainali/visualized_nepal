'use client'

import Loader from '@/components/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, Brush } from 'recharts';
import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Vegetables from '@/components/customRecharts/customTooltip_Vegetables';

export default function Vegetables() {

    const [vegetableList, setVegetableList] = useState<string[]>();

    const [selectedVegetable, setSelectedVegetable] = useState('Tomato Big(Nepali)');

    const [individualVegetableData_ByDate, setIndividualVegetableData_ByDate] = useState<IndividualVegetableDataByDate_ForChartT[] | null>(null);

    const formatPriceForChart = (price: string) => parseFloat(parseInt(price.split(' ')[1]).toFixed(1));

    useEffect(() => {
        const getVegetablesData = async (selectedVegetable: string) => {
            try {
                const { data }: { data: rangedDateVegetableDataT } = await axios.get('/api/vegetables');

                const vegetableList = data[0].vegetablesData.map(vd => vd.commodity); // get all vegetable names
                setVegetableList(vegetableList);

                const individualVegetableData_ByDate = data.map((singleDayVegetableData: SingleDayVegetableDataT) => {
                    const { date, vegetablesData } = singleDayVegetableData;

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

                setIndividualVegetableData_ByDate(individualVegetableData_ByDate.filter(ivd => ivd !== undefined));

            } catch (error) {
                console.log('Failed to fetch vegetables data!', error);
            }
        }

        getVegetablesData(selectedVegetable);
    }, [selectedVegetable])

    return (
        vegetableList && individualVegetableData_ByDate
            ? (
                <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
                    <div className='w-[90%] flex justify-end items-center gap-2'>
                        <span>Select Vegetable:</span>
                        <CustomDropDown items={vegetableList} label={selectedVegetable} onClickHandler={setSelectedVegetable} selectedValue={selectedVegetable} arrowIcon={true} />
                    </div>
                    <ResponsiveContainer width="90%" height="75%">
                        <LineChart data={individualVegetableData_ByDate} margin={{ bottom: 20 }}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="date" angle={-45} textAnchor="end" tickMargin={5} height={100} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip_Vegetables />} />
                            <Legend verticalAlign='top' height={30} />
                            <Line dataKey="average" stroke="#67AE6E " strokeWidth={2} dot={false} type="monotone" name='Price' />
                            <Brush dataKey="year" height={30} stroke="#67AE6E" />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className='text-[#67AE6E] text-[18px]'>Price trend of {selectedVegetable}</p>
                    <div className='w-[80%] relative flex justify-center'>
                        <span className='text-[12px] text-[#67AE6E] absolute right-0 top-[50%] -translate-y-[50%]'>Last updated: {individualVegetableData_ByDate[individualVegetableData_ByDate.length - 1]?.date}</span>
                    </div>
                </div>
            )
            : <Loader />
    )
}
