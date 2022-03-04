import { data } from "cheerio/lib/api/attributes";

export default class FetchDatabase {
  constructor() {
    this.databaseBody = document.querySelector(".database-body");
    this.buttonGetData = document.querySelector('#getWebScrapingData')
    this.event();
  }
  event() {
    // event registration
    this.buttonGetData.addEventListener('click', (e)=>{
      e.preventDefault()
      this.fetchDatabase()
    })
  }
  fetchDatabase() {
    // fetch the data from server
    fetch("http://localhost:3000/fetch")
      .then((response) => response.json())
      .then((data) => {
        this.insertHtml(data.data, data.journals, data.publishedDates)
      })
      .catch((err) => {
        console.log(err);
      });
    // inject data into html
    this.insertHtml();
  }

  insertHtml(data, journals, dates) {
    if (data.length > 0) {
    data.forEach((el, index)=>{
        
        this.databaseBody.insertAdjacentHTML(
          "beforeend",
          `
              <tr class="database-item" >
                  <th scope="row">${index+1}</th>
                  <td>${ el }</td>
                  <td>Afiq</td>
                  <td>${ journals[index] }</td>
                  <td>${ dates[index] }</td>
                  <td>Cited</td>
              </tr>
              `
        );
    })
    }
  }
}
