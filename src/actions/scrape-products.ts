"use server";

import puppeteer from "puppeteer";
import fs from "fs"; // Module fs cung cấp nhiều phương thức hữu ích để thao tác với tệp và thư mục
import { revalidatePath } from "next/cache";

export async function scrapeOlxProducts(url: string) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation({
            waitUntil: "networkidle0",
            timeout: 120000
        });
        await page.goto(url, { waitUntil: "networkidle0" , timeout: 120000});
        await page.addScriptTag({
            url: "https://code.jquery.com/jquery-3.6.0.min.js"
        })
        await navigationPromise;

        const isJQueryLoaded = await page.evaluate(() => {
            return !!(window as any).jQuery
        })

        if (!isJQueryLoaded) {
            throw new Error('JQuery not loaded');
        }

        // page.evaluate(): Phương thức này cho phép bạn chạy JavaScript trong ngữ cảnh của trình duyệt (trang web mà Puppeteer đang tương tác).
        const data = await page.evaluate(() => {
            const title = $("h1._6a5b090c").text().trim();
            const price = $("span._24469da7").text().trim();
            const description = $("._472bfbef").text().trim();
            const features: string[] = [];

            // const linksTitle: { url: string; text: string }[] = [];
            // const linksContent: { url: string; text: string }[] = [];

            $(".ee08ff9c")
            .children()
            .each(function() {
                features?.push($(this).text());
            })


            // Chạy từng thẻ div có class = _400f82a4 trong trình duyệt và lấy thẻ a bên trong
            // $("._5c85c0ba ._29123282 ._400f82a4").each(function(){
            //     const anchor = $(this).find("a"); // Tìm thẻ `a` bên trong `div._400f82a4`
            //     const url = anchor.attr("href") as string;  // Lấy giá trị của thuộc tính href (URL)
            //     const text = anchor.text().trim() as string; // Lấy văn bản bên trong thẻ `a` và loại bỏ khoảng trắng

            //     // Đẩy kết quả vào mảng links
            //     linksTitle?.push({ url, text });
            // })

            // Chạy từng thẻ div có class = _64aaa26e trong trình duyệt và lấy thẻ a bên trong
            // $("._5c85c0ba ._29123282 ._64aaa26e").each(function(){
            //     const anchor = $(this).find("a"); // Tìm thẻ `a` bên trong `div._400f82a4`
            //     const url = anchor.attr("href") as string;  // Lấy giá trị của thuộc tính href (URL)
            //     const text = anchor.text().trim() as string; // Lấy văn bản bên trong thẻ `a` và loại bỏ khoảng trắng

            //     // Đẩy kết quả vào mảng links
            //     linksContent?.push({ url, text });
            // })

            // return { title, price, description, features, linksTitle, linksContent };
            return { title, price, description, features };
        })
        // Đóng trình duyệt sau khi hoàn tất việc thu thập dữ liệu.
        await browser.close();
        // revalidatePath('/'): Gọi hàm revalidatePath để tái xác thực (revalidate) đường dẫn / trên máy chủ, có thể là để làm mới nội dung được cache.
        revalidatePath('/')
        return {...data, url}
    }
    catch(error) {
        console.log(error);
        return null
    }
}

export async function exportData(data: any) {
    try {
        const jsonContent = JSON.stringify(data, null, 4);
        fs.writeFile("data.json", jsonContent, "utf8", (err) => {
            if (err) {
                console.error("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been created.");
        })
    }
    catch(error) {

    }
}

