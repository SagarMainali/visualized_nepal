import React from 'react'

export default function CustomTooltip_Tourism({ active, payload, label }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    return (
        <div className="px-5 py-2 shadow-2xl rounded border border-light flex flex-col bg-slate-50/90">
            <p className="font-semibold mb-1 text-primary-gray">Year: {label}</p>
            <hr className='text-light mb-1'/>
            <span className='font-semibold text-[#4E6688]'>Arrival by air: {payload[0].value.toLocaleString('en-IN')}</span>
            <span className='font-semibold text-[#FE5D26]'>Arrival by land: {payload[1].value.toLocaleString('en-IN')}</span>
            {
                payload[2] && <span className='font-semibold text-[#328E6E]'>Total arrivals: {payload[2].value.toLocaleString('en-IN')}</span>
            }
        </div>
    );
}
