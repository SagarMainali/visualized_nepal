'use client'

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import Loader from '@/components/Loader';
import { Bar, CartesianGrid, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip_Hospital from '@/components/customRecharts/customTooltip_Hospital';
import CustomDropDown from '@/components/CustomDropdown';

export default function Hospital() {

    const [patientsData_All, setPatientsData_All] = useState<PatientsDataAllT[] | null>(null);

    useEffect(() => {
        const fetchPatientRecords = async () => {
            try {
                const { data } = await axios.get('/hospitalData/patients.csv');
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => setPatientsData_All(result.data as PatientsDataAllT[])
                });
            } catch (error) {
                console.log('Failed to fetch patients records!', error);
            }
        }

        fetchPatientRecords();
    }, [])

    const [patients_byCategory, setPatients_byCategory] = useState<Patients_ByCategoryT[] | null>(null);

    const getPatientByCategory = (category: string) => {
        if (!patientsData_All) return; // stop function execution if there is no data

        const patientCount_byCategory: Record<string, number> = {};
        const patientCount_byAge = {
            '0-15': 0,
            '15-30': 0,
            '30-45': 0,
            '45-60': 0,
            '60-75': 0,
            '75+': 0,
        } // separate object to preserver order of the properties

        patientsData_All?.forEach(patientRecord => {
            const selectedCategory = patientRecord[category as ('Condition' | 'Age' | 'Procedure')]; //get selected category from the row

            if (category !== 'Age') {
                patientCount_byCategory[selectedCategory] = (patientCount_byCategory[selectedCategory] || 0) + 1;
            } else {
                const age = patientRecord['Age'];
                if (age < 15) {
                    patientCount_byAge['0-15']++;
                } else if (age < 30) {
                    patientCount_byAge['15-30']++;
                } else if (age < 45) {
                    patientCount_byAge['30-45']++;
                } else if (age < 60) {
                    patientCount_byAge['45-60']++;
                } else if (age < 75) {
                    patientCount_byAge['60-75']++;
                } else {
                    patientCount_byAge['75+']++;
                }
            }
        })

        const patientCount_byCategory_formatted = Object.entries(category === 'Age' ? patientCount_byAge : patientCount_byCategory).map(
            ([category, count]) => ({
                category,
                count
            })
        )

        setPatients_byCategory(patientCount_byCategory_formatted);
    }

    const [selectedCategory, setSelectedCategory] = useState<string>('Condition');

    useEffect(() => {
        getPatientByCategory(selectedCategory);
    }, [patientsData_All, selectedCategory])

    return (
        patients_byCategory
            ? (
                <div className='h-full w-full flex flex-col items-center gap-4'>
                    <div className='w-[90%] flex flex-row-reverse gap-2'>
                        <CustomDropDown label='Category' arrowIcon={true} items={['Condition', 'Age', 'Procedure']} onClickHandler={setSelectedCategory} selectedValue={selectedCategory} />
                    </div>
                    <ResponsiveContainer width="90%" height="80%">
                        <BarChart data={patients_byCategory} margin={{ left: 10, right: 10 }}>
                            <XAxis
                                dataKey="category"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={140}
                                tickFormatter={(value) =>
                                    value.length > 20 ? `${value.substring(0, 10)}...` : value
                                }
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip_Hospital selectedValue={selectedCategory}/>} />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="count" fill="#4E6688" name="Number of patients" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-primary-gray text-[18px]'>Patients records categorized by <strong>'{(selectedCategory[0].toUpperCase() + selectedCategory.slice(1))}'</strong></p>
                </div>
            )
            : <Loader />
    )
}
