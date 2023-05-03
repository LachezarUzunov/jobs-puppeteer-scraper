const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.jobs.bg/front_job_search.php?subm=1&location_sid=2&last=2');

    const html = await page.content();
    const $ = cheerio.load(html);
    const titles = [];
    const links = []
    // $('.card-title > span:last-of-type').each((index, element) => {
    //     const title = $(element).text();
    //     titles.push({ title });
    // })

    // $(".black-link-b").each((index, element) => {
    //     const link = $(element).attr('href');
    //     links.push({ link });
       
    // })

    const results = $('.scroll-item').map((index, element) => {
        const titleEl = $(element).find('.card-title > span:last-of-type');
        const title = $(titleEl).text();
        const linkEl = $(element).find('.black-link-b');
        const link = $(linkEl).attr('href');
        const employerEl = $(element).find('.secondary-text');
        const employer = $(employerEl).text();
        return { title, link, employer };
    }).get();
    
  

    // $(".titlestring").each((index, element) => {
    //     console.log($(element).attr("href"))
    // })
// const data = titles.map((t, i) => {
//     return {title: t.title, link: links[i].link}
// })
    console.log(results);
}


main();