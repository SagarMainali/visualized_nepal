'use client'

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import Loader from '@/components/Loader';
import { Bar, CartesianGrid, BarChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip_Tourism from '@/components/customRecharts/customTooltip_Tourism';

interface PatientCount_ByConditionT {
    condition: string;
    count: number;
}

export default function Hospital() {

    const [patients_byCondition, setPatients_byCondition] = useState<PatientCount_ByConditionT[] | null>(null);

    useEffect(() => {
        const fetchPatientRecords = async () => {
            try {
                const { data } = await axios.get('/hospitalData/patients.csv');
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const rows = result.data as { [key: string]: string }[];
                        const conditionCount: Record<string, number> = {};

                        rows.forEach((row) => {
                            const condition = row.Condition;
                            if (condition) {
                                conditionCount[condition] = (conditionCount[condition] || 0) + 1;
                            }
                        })

                        const patients_byCondition = Object.entries(conditionCount).map(
                            ([condition, count]) => ({
                                condition,
                                count
                            })
                        )

                        setPatients_byCondition(patients_byCondition);
                    },
                });
            } catch (error) {
                console.log('Failed to fetch patients records!', error);
            }
        }

        fetchPatientRecords();
    }, [])

    const [selections, setSelections] = useState({
        stacked: true,
        showTrend: false,
    })

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
        patients_byCondition
            ? (
                <div className='h-full w-full flex flex-col items-center gap-4'>
                    <div className='w-[90%] flex flex-col items-end gap-2'>
                        <div className='view-options'> Categorized by
                            <span onClick={() => handleSelectionsChange('Condition')} className={selections.stacked ? 'selected' : ''}>Condition</span>
                            <span onClick={() => handleSelectionsChange('Age Group')} className={!selections.stacked ? 'selected' : ''}>Age Group</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="90%" height="80%">
                        <BarChart data={patients_byCondition} margin={{ left: 10, right: 10 }}>
                            <XAxis
                                dataKey="condition"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={140}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="count" fill="#4E6688" name="Number of patients" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-primary-gray text-[18px]'>Patients records categorized by <strong>'Condition'</strong></p>
                </div>
            )
            : <Loader />
    )
}
