export const getColor = (value: number) => {
    if (value < 1.0) return "#155dfc"; // low -> blue
    if (value <= 3.0) return "#2ecc71"; // normal -> green
    if (value <= 6.0) return "#f1c40f"; // moderate -> yellow
    if (value <= 10.0) return "#e67e22"; // high -> orange
    return "#e74c3c"; // ver high -> red
}