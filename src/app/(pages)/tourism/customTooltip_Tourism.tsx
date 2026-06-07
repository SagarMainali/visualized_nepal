import React from 'react'

export default function CustomTooltip_Tourism({ active, payload }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const { year, byAir, byLand, total, annualGrowthRate } = payload[0].payload;

    return (
        <div className="px-5 py-2 shadow-2xl rounded border border-light flex flex-col bg-white/70 backdrop-blur-md">
            <p className="font-semibold mb-1 text-primary-gray">Year: {year}</p>
            <hr />
            <span className='font-semibold text-[#4E6688]'>Arrival by air: {byAir.number.toLocaleString('en-IN')} ({byAir.percent}%)</span>
            <span className='font-semibold text-[#FE5D26]'>Arrival by land: {byLand.number.toLocaleString('en-IN')} ({byLand.percent}%)</span>
            <hr />
            <span className='font-semibold text-[#328E6E]'>Total arrivals: {total.toLocaleString('en-IN')}</span>
            <hr />
            <span className='font-semibold text-primary-gray'>Annual growth rate:
                <span className={annualGrowthRate.toLocaleString().includes('-') ? 'text-[#CB0404]' : 'text-[#328E6E]'}> {annualGrowthRate}%</span>
            </span>
        </div>
    );
}
