import DashboardCard from "@/components/DashboardCard";
import MarketInsightsDashboardCard from "@/components/MarketInsightsDashboardCard";
import VegetablesDashboardCard from "@/components/VegetablesDashboardCard";
import { dateFormatter, decimalFormatter, priceFormatter } from "@/helper/formatters";
import { getGoldRatesDataSummary, getInflationDataSummary, getTourismDataSummary, getVegetablesDataSummary } from "@/lib/dashboard";
import {
  Coins,
  TrendingUp,
  Users,
  Carrot
} from "lucide-react";

export default async function Dashboard() {

  const [
    goldSummary,
    inflationSummary,
    tourismSummary,
    vegetableSummary,
  ] = await Promise.all([
    getGoldRatesDataSummary(),
    getInflationDataSummary(),
    getTourismDataSummary(),
    getVegetablesDataSummary(),
  ]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4 bg-white">
          <p className="text-sm text-gray-500">Gold</p>

          <div className="flex items-center gap-2 mt-2">
            <Coins className="w-5 h-5 text-amber-500" />

            <span
              className={
                goldSummary.percentChange > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {goldSummary.percentChange > 0 ? "↑" : "↓"}
              {" "}
              {decimalFormatter(Math.abs(goldSummary.percentChange))}%
            </span>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-white">
          <p className="text-sm text-gray-500">Inflation</p>

          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />

            <span
              className={
                inflationSummary.percentChange > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {inflationSummary.percentChange > 0 ? "↑" : "↓"}
              {" "}
              {decimalFormatter(Math.abs(inflationSummary.percentChange))}%
            </span>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-white">
          <p className="text-sm text-gray-500">Tourism</p>

          <div className="flex items-center gap-2 mt-2">
            <Users className="w-5 h-5 text-purple-500" />

            <span
              className={
                tourismSummary.percentChange > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {tourismSummary.percentChange > 0 ? "↑" : "↓"}
              {" "}
              {decimalFormatter(Math.abs(tourismSummary.percentChange))}%
            </span>
          </div>
        </div>

        <div className="rounded-lg border p-4 bg-white">
          <p className="text-sm text-gray-500">Vegetables</p>

          <div className="flex items-center gap-2 mt-2">
            <Carrot className="w-5 h-5 text-green-500" />

            <span className="font-semibold text-green-600">
              {vegetableSummary.topGainer.commodity}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DashboardCard
          path="gold-rate"
          title="Gold"
          icon={Coins}
          iconColor="text-amber-500"
          value={priceFormatter(goldSummary.latest?.price ?? 0)}
          date={dateFormatter(goldSummary.latest?.englishDate!, 'm/d/y')}
          previousValue={priceFormatter(goldSummary.previous?.price ?? 0)}
          percentChange={goldSummary.percentChange}
          valueChange={goldSummary.latest?.price! - goldSummary.previous?.price!}
        />

        <DashboardCard
          path="inflation"
          title="Inflation"
          icon={TrendingUp}
          iconColor="text-blue-500"
          value={`${inflationSummary.latest?.value}%`}
          date={`Year ${inflationSummary.latest?.year}`}
          previousValue={`${inflationSummary.previous?.value}%`}
          percentChange={inflationSummary.percentChange}
          isRisingGood={false}
        />

        <DashboardCard
          path="tourism"
          title="Tourism"
          annotation="arrivals"
          icon={Users}
          iconColor="text-purple-500"
          value={tourismSummary.latest?.total.toLocaleString() ?? ''}
          date={`Year ${tourismSummary.latest?.year}`}
          previousValue={tourismSummary.previous?.total.toLocaleString() ?? ''}
          percentChange={tourismSummary.percentChange}
          isRisingGood={true}
        />

        <VegetablesDashboardCard
          path="vegetables"
          totalCommodities={vegetableSummary.totalCommodities}
          topGainer={vegetableSummary.topGainer}
          topLoser={vegetableSummary.topLoser}
          annotation="commodities tracked"
        />

        <MarketInsightsDashboardCard
          goldSummary={goldSummary}
          inflationSummary={inflationSummary}
          tourismSummary={tourismSummary}
          vegetableSummary={vegetableSummary}
        />
      </div>
    </div >
  );
}
