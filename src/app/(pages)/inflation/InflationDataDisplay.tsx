'use client'

import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceArea } from 'recharts';
import CustomTooltip_InflationRate from '@/app/(pages)/inflation/CustomTooltip_InflationRate';
import CustomActiveDot from '@/app/(pages)/inflation/CustomActiveDot_InflationRate';

type InflationDataDisplayProps = {
    inflationData: InflationRateData_ResponseT
}

export default function InflationDataDisplay({ inflationData }: InflationDataDisplayProps) {
    return (
        <ResponsiveContainer width="90%" height="100%">
            <LineChart data={inflationData.inflationRateData} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="year" angle={-45} textAnchor="end" tickMargin={5} />
                <YAxis tickFormatter={(value) => `${(value)}%`} domain={[-5, 20]} scale="linear" />
                <Tooltip content={<CustomTooltip_InflationRate />} />
                <Legend verticalAlign='top' height={30} />
                <Line dataKey="value" stroke="#155dfc " strokeWidth={2} activeDot={<CustomActiveDot />} dot={false} type="monotone" name='Rate' />
                <ReferenceArea y1={1} y2={3} fill='green' fillOpacity={0.2} />
            </LineChart>
        </ResponsiveContainer>
    )
}
