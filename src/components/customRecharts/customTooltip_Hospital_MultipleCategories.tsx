import React from 'react'

export default function CustomTooltip_Hospital_MultipleCategories({ active, payload, selectedValue, selectedValue2 }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const selectedBarLabel = payload[0].payload.subCategory_of_firstCategory

    const tooltipData = payload.map(selectedBarData => {
        const { name, value, color } = selectedBarData;

        return {
            label: name,
            count: value,
            color
        }
    })

    return (
        <div className="px-6 py-4 shadow-2xl rounded border border-light flex flex-col bg-slate-50/90">
            <p className="font-semibold mb-1 text-primary-gray underline underline-offset-2">Comparision: {selectedValue} vs {selectedValue2!}</p>
            <p className="font-semibold mb-1 text-primary-gray">{selectedValue}: {selectedBarLabel}</p>
            <hr />
            {
                tooltipData.reverse().map(data => {
                    const { label, count, color } = data;
                    return <span key={label} className='font-semibold' style={{ color }}>{label}: {count}</span>
                })
            }
        </div>
    );
}
