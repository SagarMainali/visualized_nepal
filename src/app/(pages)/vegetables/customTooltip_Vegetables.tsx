import React from 'react'
import { dateFormatter, priceFormatter } from '@/helper/formatters';

export default function CustomTooltip_Vegetables({ active, payload }: CustomTooltipT) {
    if (!active || !payload || !payload.length) return null;

    const { date, maximum, minimum, average, unit } = payload[0].payload;

    return (
        <div className="p-4 shadow-2xl rounded border border-light text-[#67AE6E] font-semibold bg-white">
            <p className=" mb-2">Date: {dateFormatter(date, 'y-m-d')}</p>
            <hr />
            <span>Unit: {unit}</span>
            <hr />
            <div className='flex flex-col'>
                <span>Minimum: {priceFormatter(minimum)}</span>
                <span>Maximum: {priceFormatter(maximum)}</span>
                <span>Average: {priceFormatter(average)}</span>
            </div>
        </div>
    );
}
