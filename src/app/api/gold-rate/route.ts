import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';

const goldRatesData_url = "https://gahanaonline.com/gold-rate-history/"

export async function GET() {
    try {
        const $ = await cheerio.fromURL(goldRatesData_url);

        const goldRatesData: GoldRateDataT[] = []

        $('table thead tr').each((i, el) => {
            if (i === 0) return; // omit the first row since it is the heading
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