import React from 'react'

export default function CustomTooltip_Tourism({ active, payload }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const { year, byAir, byLand, total } = payload[0].payload;

    return (
        <div className="px-5 py-2 shadow-2xl rounded border border-light flex flex-col bg-slate-50/90">
            <p className="font-semibold mb-1 text-primary-gray">Year: {year}</p>
            <hr />
            <span className='font-semibold text-[#4E6688]'>Arrival by air: {byAir.number.toLocaleString('en-IN')}</span>
            <span className='font-semibold text-[#FE5D26]'>Arrival by land: {byLand.number.toLocaleString('en-IN')}</span>
            <hr />
            <span className='font-semibold text-[#328E6E]'>Total arrivals: {total.toLocaleString('en-IN')}</span>
        </div>
    );
}
