export const getColor = (value: number) => {
    if (value < 0) return "#7c3aed"; // Violet
    if (value < 3) return "#2563eb"; // Blue
    if (value <= 6) return "#16a34a"; // Green
    if (value <= 8) return "#f59e0b"; // Amber
    if (value <= 10) return "#f97316"; // Orange
    return "#dc2626"; // Red
};

export const getInflationLabel = (value: number) => {
    if (value < 0) return "Deflation";
    if (value < 3) return "Low";
    if (value <= 6) return "Healthy";
    if (value <= 8) return "Elevated";
    if (value <= 10) return "High";
    return "Very High";
};

// Exact ranges for legend
export const inflationRanges = [
    { min: -Infinity, max: 0 },
    { min: 0, max: 3 },
    { min: 3, max: 6 },
    { min: 6, max: 8 },
    { min: 8, max: 10 },
    { min: 10, max: Infinity },
];