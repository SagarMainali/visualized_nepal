import "server-only";
import * as cheerio from "cheerio";

const goldRatesDataUrl =
    "https://gahanaonline.com/gold-rate-history/";

export async function getGoldRates(): Promise<GoldRateDataT[]> {
    // const $ = await cheerio.fromURL(goldRatesData_url);

    const res = await fetch(goldRatesDataUrl, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const goldRatesData: GoldRateDataT[] = [];

    // $('table thead tr').each((i, el) => {
    $("table tbody tr").each((_, el) => {
        // if (i === 0) return; // omit the first row since it is the heading
        const englishDate = $(el).find("td").eq(0).text().trim();
        const nepaliDate = $(el).find("td").eq(1).text().trim();
        const price = $(el).find("td").eq(2).text().trim();

        if (nepaliDate && englishDate && price) {
            const numericPrice = parseInt(
                price.replace(/[,/-]/g, "")
            );

            goldRatesData.push({
                nepaliDate,
                englishDate,
                price: numericPrice,
            });
        }
    });

    const finalGoldRatesData = goldRatesData.reverse();
    return finalGoldRatesData;
}