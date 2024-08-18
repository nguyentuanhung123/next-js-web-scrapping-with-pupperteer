"use server";

import puppeteer from "puppeteer";
import { revalidatePath } from "next/cache";

export async function scrapeOlxProducts(url: string) {
    try {
        return null
    }
    catch(error) {
        console.log(error);
        return null
    }
}

