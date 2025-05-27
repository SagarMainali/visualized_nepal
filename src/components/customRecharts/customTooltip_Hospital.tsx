import React from 'react'

export default function CustomTooltip_Hospital({ active, payload, label }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    return (
        <div className="px-5 py-2 shadow-2xl rounded border border-light flex flex-col bg-slate-50/90">
            <p className="font-semibold mb-1 text-primary-gray">Condition: {label}</p>
            <hr />
            <span className='font-semibold text-[#4E6688]'>No. of Patients: {payload[0].value}</span>
        </div>
    );
}
