const puppeteer = require('puppeteer');
const mysql = require('mysql');
const axios = require('axios');
setInterval(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://kenh14.vn');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('h3.knswli-title > a');
        titleLinks = [...titleLinks];
        let articles = titleLinks.map(link => ({
            title: link.getAttribute('title'),
            url: link.getAttribute('href'),
            content: link.innerHTML

        }));
        return articles;
        let time = document.querySelectorAll('div.knswli-meta > span');
        time = [...time];
        let display = time.map(link => ({
            Time: link.innerHTML
        }));
        return display;
        let content = document.querySelectorAll('span.knswli-sapo');
        content = [...content];
        let Content = content.map(link => ({
            Content: link.innerHTML
        }));
        return Content;
        const data = {
            title : titleLinks[0].title,
            url : titleLinks[0].url,
            time : time[0].Time,
            content : content[0].Content
        }
        axios.post('http://localhost:3000/api/data', data)
    });


    await browser.close();
    
},30000);