const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.fetch = async () => {
  // let url = "https://www.sciencedirect.com/search?qs=%E2%80%9Cstarch%E2%80%9D%20AND%20%28%E2%80%9Ccharacteristic%E2%80%9D%20OR%20%E2%80%9Cproperty%E2%80%9D%20%29%20AND%20%28%E2%80%9CBioplastic%E2%80%9D%20OR%20%E2%80%9Cthermoplastic%E2%80%9D%20%29";
  // let response = await fetch(url);
  // console.log('res '+ response);
  // let data = await response.text();
  // if(data) console.log(data)
  // let parseData = cheerio.load(data);
  // let parseTableData = parseData('div#srp-results-list');
  // console.log(parseTableData)

  

//   (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto("http://myapps.iium.edu.my/StudentOnline/schedule1.php", {waituntil: 'domcontentloaded'});
//     await page.screenshot({ path: "example.png" });

//     await browser.close();
//   })();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.sciencedirect.com/search?qs=%E2%80%9Cstarch%E2%80%9D%20AND%20%28%E2%80%9Ccharacteristic%E2%80%9D%20OR%20%E2%80%9Cproperty%E2%80%9D%20%29%20AND%20%28%E2%80%9CBioplastic%E2%80%9D%20OR%20%E2%80%9Cthermoplastic%E2%80%9D%20%29', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#srp-pagination-options');
  await page.screenshot({ path: 'example.png' });

//   const results = await page.$$eval('article div[lang]', (tweets) => tweets.map((tweet) => tweet.textContent));
//   console.log(results);

  browser.close();
})();
};
