const express = require("express");
const res = require("express/lib/response");
const puppeteer = require("puppeteer")

let app = express();


async function main() {
  app.get("/", (req,res)=> {
    res.status(200)
    res.send("Server is up and running")
  })

  app.get("/login", (req,res)=> {
    async function loginInstagram() {
      // open up browser (headless = false opens up the browser for view)
      const browser = await puppeteer.launch({
        'args' : [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      })
      // incognito mode
      const context = await browser.createIncognitoBrowserContext()
      // new tab
      const page = await context.newPage()
      // go to link
      await page.goto("https://www.instagram.com/", {
          waitUntil: 'networkidle2'
      })
      // fill in login details
      await page.type("input[name=username]", process.env.INSTA_USERNAME)
      await page.type("input[name=password]", process.env.INSTA_PASSWORD)
      // submit login form
      await page.click("button[type=submit]")
      await page.waitForNavigation()
      // refresh instagram page
      await page.click("a[href='/']")
      await page.waitForNavigation()
      // click on popup
      const [button] = await page.$x("//button[.='Not Now']")
      if (button) {
          await button.click()
      }
  
      await browser.close()
  }
  
  loginInstagram()
  })

  res.send("loggedin")
  
}


main();

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});