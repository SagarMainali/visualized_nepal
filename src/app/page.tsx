import { decimalFormatter } from "@/helper/formatters";
import { getGoldRatesDataSummary, getInflationDataSummary, getTourismDataSummary, getVegetablesDataSummary } from "@/lib/dashboard";

export default async function Dashboard() {

  const [
    goldSummary,
    inflationSummary,
    tourismSummary,
    vegetableSummary,
    // hospitalSummary
  ] = await Promise.all([
    getGoldRatesDataSummary(),
    getInflationDataSummary(),
    getTourismDataSummary(),
    getVegetablesDataSummary(),
    // getHospitalSummary()
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="text-2xl font-bold">Gold Price</h2>
          <div className="flex flex-col">
            <p>Latest: {goldSummary.latest?.price ?? 0}</p>
            <p>Previous: {goldSummary.previous?.price ?? 0}</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="text-2xl font-bold">Inflation</h2>
          <div className="flex flex-col">
            <p>Latest: {inflationSummary.latest?.value ?? 0}</p>
            <p>Previous: {inflationSummary.previous?.value ?? 0}</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="text-2xl font-bold">Tourists</h2>
          <div className="flex flex-col">
            <p>Latest: {tourismSummary.latest?.annualGrowthRate ?? 0}</p>
            <p>Previous: {tourismSummary.previous?.annualGrowthRate ?? 0}</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="text-2xl font-bold">Vegetables</h2>

          <div className="space-y-2">
            <p><strong>{vegetableSummary.totalCommodities}</strong> commodities tracked</p>

            <div>
              <p>Top Gainer:</p>
              <p>{vegetableSummary.topGainer.commodity}: +{decimalFormatter(vegetableSummary.topGainer.percent)}% (+{decimalFormatter(vegetableSummary.topGainer.change)})</p>
            </div>

            <div>
              <p>Top Loser:</p>
              <p>{vegetableSummary.topLoser.commodity}: {decimalFormatter(vegetableSummary.topLoser.percent)}% ({decimalFormatter(vegetableSummary.topLoser.change)})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
