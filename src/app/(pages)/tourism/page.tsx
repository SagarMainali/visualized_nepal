'use client'

import Loader from '@/components/Loader';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip_Tourism from '@/components/customRecharts/customTooltip_Tourism';

export default function Tourism() {

    const [tourismData, setTourismData] = useState<TourismDataT[] | null>(null);

    const [selections, setSelections] = useState({
        stacked: true,
        showTrend: false,
    })

    useEffect(() => {
        const getToursimData = async () => {
            try {
                const { data } = await axios.get('/tourismData/tourismData.json');
                setTourismData(data);
            } catch (error) {
                console.log('Failed to fetch tourism data!', error);
            }
        }

        getToursimData();
    }, [])

    const handleSelectionsChange = (name: string) => {
        setSelections(prev => {
            if (name === 'stacked') {
                return {
                    ...prev,
                    stacked: true
                }
            }
            else if (name === 'separate') {
                return {
                    ...prev,
                    stacked: false
                }
            }
            else {
                return {
                    ...prev,
                    showTrend: !prev.showTrend
                }
            }
        })
    }

    return (
        tourismData
            ? (
                <div className='h-full w-full flex flex-col items-center gap-6'>
                    <div className='w-full flex flex-col items-end gap-2'>
                        <div className='view-options'> Type
                            <span onClick={() => handleSelectionsChange('stacked')} className={selections.stacked ? 'selected' : ''}>Stacked</span>
                            <span onClick={() => handleSelectionsChange('separate')} className={!selections.stacked ? 'selected' : ''}>Separate</span>
                        </div>
                        <div className='view-options'> View
                            <span onClick={() => handleSelectionsChange('trend')} className={selections.showTrend ? 'selected' : ''}>Show trend</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="85%" height="75%">
                        <ComposedChart data={tourismData} margin={{ left: 10, right: 10 }}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip_Tourism />} />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="byAir.number" fill="#4E6688" name="Arrival by air" stackId={selections.stacked ? 'a' : undefined} />
                            <Bar dataKey="byLand.number" fill="#FE5D26" name="Arrival by Land" stackId={selections.stacked ? 'a' : undefined} />
                            {
                                selections.showTrend && <Line dataKey="total" type="monotone" stroke="#328E6E" strokeWidth={2} name="Total arrivals" />
                            }
                        </ComposedChart>
                    </ResponsiveContainer>
                    <p className='text-primary-gray text-[18px]'>Tourism Arrival in Nepal from <strong>1963</strong> to <strong>2023</strong></p>
                </div>
            )
            : <Loader />
    )
}
