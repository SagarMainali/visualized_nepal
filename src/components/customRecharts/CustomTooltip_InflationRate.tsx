import React from 'react'
import { getColor } from './helper/getColor';

export default function CustomTooltip_InflationRate({ active, payload }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const { year, value } = payload[0].payload;

    return (
        <div className="px-5 py-2 shadow-2xl rounded border border-light">
            <p className="font-semibold mb-1 text-primary-gray">Year: {year}</p>
            <hr />
            <span className='font-semibold' style={{ color: getColor(value) }}>Change in %: {value}</span>
        </div>
    );
}
