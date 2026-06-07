import { Lightbulb, TrendingDown, TrendingUp } from "lucide-react";
import type {
    GoldSummary,
    InflationSummary,
    TourismSummary,
    VegetableSummary,
} from "@/lib/dashboard";

type Props = {
    goldSummary: GoldSummary;
    inflationSummary: InflationSummary;
    tourismSummary: TourismSummary;
    vegetableSummary: VegetableSummary;
};

export default function MarketInsightsDashboardCard({
    goldSummary,
    inflationSummary,
    tourismSummary,
    vegetableSummary,
}: Props) {
    const insights = [
        {
            positive: (goldSummary?.percentChange ?? 0) > 0,
            text: `Gold prices ${(goldSummary?.percentChange ?? 0) > 0
                ? "increased"
                : "decreased"} 
                by ${Math.abs(goldSummary?.percentChange ?? 0).toFixed(2)}% the previous recorded price.`,
        },

        {
            positive: (inflationSummary?.percentChange ?? 0) > 0,
            text: `Inflation rate moved from ${inflationSummary?.previous?.value ?? "N/A"}% to 
            ${inflationSummary?.latest?.value ?? "N/A"}%.`,
        },

        {
            positive: (tourismSummary?.percentChange ?? 0) > 0,
            text: `Tourist arrivals growth rate changed by 
            ${(tourismSummary?.percentChange ?? 0).toFixed(2)}% compared to last year.`,
        },

        {
            positive: true,
            text: vegetableSummary?.topGainer
                ? `"${vegetableSummary.topGainer.commodity}" recorded the biggest price increase among vegetables today.`
                : "No vegetable performance data available.",
        },
    ];

    return (
        <div className="dashboard-card col-span-full hover:translate-y-0! shadow-2xl!">
            <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">
                    Market Insights
                </h2>
            </div>

            <div className="grid gap-3">
                {insights.map((insight, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border bg-slate-50 p-4"
                    >
                        {insight.positive ? (
                            <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-500 mt-0.5" />
                        )}

                        <p>{insight.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}