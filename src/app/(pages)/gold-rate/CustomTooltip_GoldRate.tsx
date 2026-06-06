import React from 'react'
import { dateFormatter, priceFormatter } from '@/helper/formatters';

export default function CustomTooltip_GoldRate({ active, payload, dateType }: CustomTooltipT) {
    if (!active || !payload || !payload.length) return null;

    const { englishDate, nepaliDate, price } = payload[0].payload;

    return (
        <div className="p-4 shadow-2xl rounded border border-light bg-white/10 backdrop-blur-md">
            {dateType && <p className="font-semibold mb-2 text-primary-gray">Date: {dateFormatter(dateType === 'AD' ? englishDate : nepaliDate, 'm/d/y', dateType)}</p>}
            <hr />
            <span className='text-primary-green font-semibold'>Price: {priceFormatter(price)}</span>
        </div>
    );
}
