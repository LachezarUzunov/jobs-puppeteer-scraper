const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeListings(page) {
    await page.goto('https://www.jobs.bg/front_job_search.php?subm=1&location_sid=2&last=2');

    const html = await page.content();
    const $ = cheerio.load(html);

    const results = $('.scroll-item').map((index, element) => {
        const titleEl = $(element).find('.card-title > span:last-of-type');
        const title = $(titleEl).text();
        const linkEl = $(element).find('.black-link-b');
        const link = $(linkEl).attr('href');
        const employerEl = $(element).find('.secondary-text');
        const employer = $(employerEl).text();
        return { title, link, employer };
    }).get();
    
    return results;
}

async function scrapeJobDescriptions(listings, page) {
    for (let i = 0; i < listings.length; i++) {
        await page.goto(listings[i].link)
        const html = await page.content();
        const $ = cheerio.load(html);
        const dateDiv = $('.flex-1 > div:first-child');
        const date = $(dateDiv).text();
        const ul = $('.options > ul > li:first-child > span');
        const workPlace = $(ul).text();
        console.log(workPlace);
        await sleep(1000)
    }
}

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const listings = await scrapeListings(page);
    const listingsWithJobDescriptions = await scrapeJobDescriptions(listings, page)
}

main();