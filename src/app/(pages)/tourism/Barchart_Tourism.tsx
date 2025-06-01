import Loader from '@/components/Loader';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Bar, Brush, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip_Tourism from '@/components/customRecharts/customTooltip_Tourism';

export default function Barchart_Tourism() {

    const [tourismData, setTourismData] = useState<TourismDataT[] | null>(null);

    const [selections, setSelections] = useState({
        type: 'stacked',
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
                    type: 'stacked'
                }
            }
            else if (name === 'separate') {
                return {
                    ...prev,
                    type: 'separate'
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
                <div className='h-[93vh] w-full flex flex-col items-center gap-6 py-4'>
                    <div className='w-[90%] flex flex-col items-end gap-2 mr-[80px]'>
                        <div className='view-options'> Type
                            <span onClick={() => handleSelectionsChange('stacked')} className={selections.type === 'stacked' ? 'selected' : ''}>Stacked</span>
                            <span onClick={() => handleSelectionsChange('separate')} className={selections.type === 'separate' ? 'selected' : ''}>Separate</span>
                        </div>
                        <div className='view-options'> View
                            <span onClick={() => handleSelectionsChange('trend')} className={selections.showTrend ? 'selected' : ''}>Show trend</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="90%" height="70%">
                        <ComposedChart data={tourismData} margin={{ left: 10, right: 40 }}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip_Tourism />} />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="byAir.number" fill="#4E6688" name="Arrival by air" stackId={selections.type === 'stacked' ? 'a' : undefined} />
                            <Bar dataKey="byLand.number" fill="#FE5D26" name="Arrival by Land" stackId={selections.type === 'stacked' ? 'a' : undefined} />
                            {
                                selections.showTrend && <Line dataKey="total" type="monotone" stroke="#328E6E" strokeWidth={2} name="Total arrivals" />
                            }
                            <Brush dataKey="year" height={30} stroke="#8884d8" />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <p className='text-primary-gray text-[18px]'>Tourism Arrival in Nepal from <strong>1963</strong> to <strong>2023</strong></p>
                </div>
            )
            : <Loader />
    )
}
