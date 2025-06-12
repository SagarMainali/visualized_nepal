import React from 'react'
import { dateFormatter, priceFormatter } from '@/helper/formatters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function CustomTooltip_Vegetables({ active, payload }: CustomTooltipT) {
    if (!active || !payload || !payload.length) return null;

    const { date, maximum, minimum, average, unit, fluctuationValue, fluctuationPercentage, hasSignificantFluctuation } = payload[0].payload;

    return (
        <div className={`py-4 px-6 shadow-2xl rounded border-2 text-[#67AE6E] font-semibold bg-white ${hasSignificantFluctuation ? 'border-red-500' : 'border-light'}`}>
            <p>Date: {dateFormatter(date, 'y-m-d')}</p>
            <hr />
            <span>Unit: {unit}</span>
            <hr />
            <div className='flex flex-col'>
                <span>Minimum: {priceFormatter(minimum)}</span>
                <span>Maximum: {priceFormatter(maximum)}</span>
                <span className='flex items-center gap-1'>Average: {priceFormatter(average)} {fluctuationValue > 0 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}</span>
            </div>
            <hr />
            <span>Fluctuation: {`${priceFormatter(fluctuationValue)} (${fluctuationPercentage}%)`}</span>
        </div>
    );
}
