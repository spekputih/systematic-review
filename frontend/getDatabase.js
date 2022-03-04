import { data } from "cheerio/lib/api/attributes";

export default class FetchDatabase {
  constructor() {
    this.databaseBody = document.querySelector(".database-body");
    this.buttonGetData = document.querySelector('#getWebScrapingData')
    this.resultCountEl = document.querySelector('#resultCount')
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
        this.resultCountEl.innerHTML = data.resultCount
        this.insertHtml(data.data)
      })
      .catch((err) => {
        console.log(err);
      });
    // inject data into html
    this.insertHtml();
  }

  insertHtml(data) {
    
    if (data.length > 0) {
    data.forEach((el, index)=>{
        
        this.databaseBody.insertAdjacentHTML(
          "beforeend",
          `
              <tr class="database-item" >
                  <th scope="row">${index+1}</th>
                  <td>${ el.title }</td>
                  <td>Afiq</td>
                  <td>${ el.journal }</td>
                  <td>${ el.publishedDate }</td>
                  <td>Cited</td>
              </tr>
              `
        );
    })
    }
  }
}
