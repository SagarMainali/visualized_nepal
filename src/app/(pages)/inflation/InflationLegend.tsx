import { getColor, getInflationLabel, inflationRanges } from "./getTooltipInfo";

export const InflationLegend = () => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {inflationRanges.map((range, idx) => {
        let value = 0;
        if (range.min === -Infinity) value = -1;
        else if (range.max === Infinity) value = range.min + 1;
        else value = (range.min + range.max) / 2;

        const color = getColor(value);
        const label = getInflationLabel(value);

        return (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
            <span>
              {label} (
              {range.min === -Infinity ? "<0" : range.min}
              {range.max !== Infinity && range.max !== 0 ? `–${range.max}` : ""}
              {range.max === Infinity ? "+" : "%"})
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default InflationLegend;