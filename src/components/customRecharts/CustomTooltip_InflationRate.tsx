import React from 'react'
import { getColor } from './helper/getColor';

export default function CustomTooltip_InflationRate({ active, payload, label }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const { value } = payload![0];

    return (
        <div className="px-5 py-2 shadow-2xl rounded border border-light">
            <p className="font-semibold mb-1 text-primary-gray">Year: {label}</p>
            <hr className='text-light mb-1'/>
            <span className='font-semibold' style={{ color: getColor(value) }}>Change in %: {value}</span>
        </div>
    );
}
