const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.jobs.bg/front_job_search.php?subm=1&location_sid=2&last=2');

    const html = await page.content();
    const $ = cheerio.load(html);
    const elements = [];

    $('.card-title > span:last-of-type').each((index, element) => {
        console.log($(element).text())
    })

    // $(".titlestring").each((index, element) => {
    //     console.log($(element).attr("href"))
    // })

    console.log(elements);
}


main();