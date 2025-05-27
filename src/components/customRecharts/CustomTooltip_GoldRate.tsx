import React from 'react'
import { dateFormatter, priceFormatter } from '@/helper/formatters';

export default function CustomTooltip_GoldRate({ active, payload, label, dateType }: CustomTooltipT) {
    if (!active || !payload || !payload.length) return null;

    const { value } = payload[0];

    return (
        <div className="p-4 shadow-2xl rounded border border-light">
            {dateType && <p className="font-semibold mb-2 text-primary-gray">Date: {dateFormatter(label!, 'm/d/y', dateType)}</p>}
            <hr />
            <span className='text-primary-green font-semibold'>Price: {priceFormatter(value)}</span>
        </div>
    );
}
