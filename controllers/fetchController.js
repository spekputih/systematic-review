const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");


let getInformation = async (page)=>{
  
  const titles = await page.$$eval(".result-list-title-link", (titles)=> titles.map(title => title.textContent) );
  const journals = await page.$$eval(".subtype-srctitle-link>span", (journals)=> journals.map(journal => journal.textContent) );
  const publishedDates = await page.$$eval(".srctitle-date-fields>span:nth-child(2)", (publishedDates)=> publishedDates.map(publishedDate => publishedDate.textContent) );
  let authorsitem = []
  const authors = await page.$$eval("span.author", (authors)=> {
    authors.map(authorslist => {
      authorslist.textContent
    })
  });
  let data = {
    titles: titles,
    journals: journals,
    publishedDates: publishedDates,
  }
  
  let arrangedData = arrangeData(data)

  return arrangedData
}

let arrangeData = (data)=>{
  let info=[]
  for(i=0; i < data.titles.length ; i++){
    info.push({
      title: data.titles[i],
      journal: data.journals[i],
      publishedDate: data.publishedDates[i],
    })
  }
  return info
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
    
    await page.waitForSelector("#srp-pagination-options");
    const resultCount = await page.$eval(".search-body-results-text", (result)=> result.textContent);
    let concatedData = []
    let control = 0
    // while(await page.$('.next-link')){
    //   data = await getInformation(page)
    //   await page.click('.next-link')
    // }
    
    while(control<3){
      await page.waitForTimeout(2000)
      let data = await getInformation(page)
      // console.log(data)
      data.map(d=>{
        concatedData.push(d)
      })
      await page.click('.next-link')
      control++
    }

    browser.close();
    console.log(concatedData)
    return res.json({data: concatedData, resultCount: resultCount});
  } catch (error) {
    console.log(error)
  }
  
    
    
  
};
