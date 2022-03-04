const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");


let getInformation = async (page)=>{
  
  const item = await page.$$eval(".result-list-title-link", (titles)=> titles.map(title => title.textContent) );
  const journals = await page.$$eval(".subtype-srctitle-link>span", (journals)=> journals.map(journal => journal.textContent) );
  const publishedDates = await page.$$eval(".srctitle-date-fields>span:nth-child(2)", (publishedDates)=> publishedDates.map(publishedDate => publishedDate.textContent) );
  let authorsitem = []
  const authors = await page.$$eval("span.author", (authors)=> {
    authors.map(authorslist => {
      authorslist.textContent
    })
  });
  let data = {
    item: item,
    journals: journals,
    publishedDates: publishedDates,
  }
  
  return data 
}



exports.fetch = async (req, res) => {
  let tryurl = 'https://www.sciencedirect.com/search?qs=%E2%80%9Cstarch%E2%80%9D%20AND%20%28%E2%80%9Ccharacteristic%E2%80%9D%20OR%20%E2%80%9Cproperty%E2%80%9D%20%29%20AND%20%28%E2%80%9CBioplastic%E2%80%9D%20OR%20%E2%80%9Cthermoplastic%E2%80%9D%20%29&offset=975'

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://www.sciencedirect.com/search?qs=%E2%80%9Cstarch%E2%80%9D%20AND%20%28%E2%80%9Ccharacteristic%E2%80%9D%20OR%20%E2%80%9Cproperty%E2%80%9D%20%29%20AND%20%28%E2%80%9CBioplastic%E2%80%9D%20OR%20%E2%80%9Cthermoplastic%E2%80%9D%20%29",
      { waitUntil: "domcontentloaded" }
    );
    // page.waitForNavigation()
    await page.waitForSelector("#srp-pagination-options");
    let data
    // await page.click('.next-link')
    // await page.waitForSelector("#srp-pagination-options");
    // let data2 = await getInformation(page)
    // console.log(data2)
    
    while(await page.$('.next-link')){
      data = await getInformation(page)
      await page.click('.next-link')

    }

    browser.close();
    return res.json({data: data.item, journals: data.journals, publishedDates: data.publishedDates});
  } catch (error) {
    console.log(error)
  }
  
    
    
  
};
