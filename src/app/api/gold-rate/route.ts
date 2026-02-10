import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export const runtime = "nodejs";

const goldRatesData_url = "https://gahanaonline.com/gold-rate-history/"

export async function GET() {
    try {
        // const $ = await cheerio.fromURL(goldRatesData_url);

        const res = await fetch(goldRatesData_url, {
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

        const goldRatesData: GoldRateDataT[] = []

        // $('table thead tr').each((i, el) => {
        $('table tbody tr').each((_, el) => {
            // if (i === 0) return; // omit the first row since it is the heading
            const englishDate = $(el).find('td').eq(0).text().trim();
            const nepaliDate = $(el).find('td').eq(1).text().trim();
            const price = $(el).find('td').eq(2).text().trim();

            if (nepaliDate && englishDate && price) {

                const cleanedPrice = price.replace(/[,/-]/g, '');
                const numericPrice = parseInt(cleanedPrice);

                goldRatesData.push({
                    nepaliDate,
                    englishDate,
                    price: numericPrice
                })
            }
        })
        return NextResponse.json(goldRatesData.reverse(), { status: 200 });
    } catch (error) {
        console.log("Data scraping error!");
        return NextResponse.json({ message: error instanceof Error ? error.message : "Data scraping error!" }, { status: 500 });
    }
}