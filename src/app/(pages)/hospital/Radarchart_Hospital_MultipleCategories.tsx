import Loader from '@/components/Loader';
import React from 'react'
import { ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, Legend } from 'recharts';

export default function Radarchart_Hospital() {

    const patients_bySatisfaction_forProcedure = [
        {
            "satisfaction": "Very Dissatisfied",
            "Surgery and Chemotherapy": 83,
            "Physical Therapy and Pain Management": 40,
            "Medication and Counseling": 4
        },
        {
            "satisfaction": "Dissatisfied",
            "Surgery and Chemotherapy": 36,
            "Physical Therapy and Pain Management": 65,
            "Medication and Counseling": 17
        },
        {
            "satisfaction": "Neutral",
            "Surgery and Chemotherapy": 44,
            "Physical Therapy and Pain Management": 38,
            "Medication and Counseling": 61
        },
        {
            "satisfaction": "Satisfied",
            "Surgery and Chemotherapy": 99,
            "Physical Therapy and Pain Management": 112,
            "Medication and Counseling": 135
        },
        {
            "satisfaction": "Very Satisfied",
            "Surgery and Chemotherapy": 85,
            "Physical Therapy and Pain Management": 90,
            "Medication and Counseling": 103
        }
    ]

    return (
        <div className='h-[93vh] w-full flex flex-col items-center py-4 gap-2 relative'>
            {patients_bySatisfaction_forProcedure
                ? (<>
                    <ResponsiveContainer width="100%" height="90%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={patients_bySatisfaction_forProcedure}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="satisfaction" />
                            <PolarRadiusAxis />
                            <Radar dataKey="Surgery and Chemotherapy" fill="#B33791" fillOpacity={0.5} name='Surgery and Chemotherapy' />
                            <Radar dataKey="Physical Therapy and Pain Management" fill="#FF9B45" fillOpacity={0.5} name='Physical Therapy and Pain Management' />
                            <Radar dataKey="Medication and Counseling" fill="#096B68" fillOpacity={0.5} name='Medication and Counseling' />
                            <Legend />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                    <p className='chart-label'>Number of patients categorized by <strong>'Satisfaction level'</strong> for 3 different <strong>'Treatment Procedure'.</strong></p>
                </>)
                : <Loader />
            }
        </div>
    )
}
