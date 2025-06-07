// import express from 'express';
// import puppeteer from 'puppeteer';
// const router = express.Router();
// router.use(express.json());

// import rateLimit from 'express-rate-limit';
// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 5,
// });
// //api/edc-price
// router.use('/', limiter);

// router.get('/', async(req,res,next) => {
//   const url = 'https://www.stubhub.com/electric-daisy-carnival-las-vegas-tickets-5-15-2026/event/158340054/?qid=55d4d70c-84b8-4f79-90a6-1ee618c161d0&iid=b423c053-e205-4482-8d26-afc5a4a111db&index=stubhub&ut=6c568e86768074f19b061224ac4b40e400ca4dfb&quantity=1'
//   let browser;

//   try{
//     browser = await puppeteer.launch({
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       headless: true
//     });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle2', timeout:30_159});
//     await page.waitForSelector('#listings-container', { timeout: 15_000 });

//     const price = await page.$eval(
//       '#listings-container > div > div', 
//       el => el.getAttribute('data-price')
//     );
//     const noDollarPrice = price.replace('$',"");
//     const numericPrice = Number(noDollarPrice);
//     if(isNaN(numericPrice)) throw new Error(`could not parse the price: ${numericPrice}`);
//     console.log('it worked', numericPrice);
//     res.json({price: numericPrice });
  
//   }catch(err){
//     console.log(err);
//     res.send('error with puppet');
//   } finally {
//     if(browser) await browser.close();
//   }
// });

// router.post('/alert', async(req, res, next) => {


// })
// export default router;

// backend/api/price.js
import express from 'express';
import * as cheerio from 'cheerio';

const router = express.Router();

router.get('/', async (req, res) => {
  const url = 'https://www.stubhub.com/electric-daisy-carnival-las-vegas-tickets-5-15-2026/event/158340054/?qid=55d4d70c-84b8-4f79-90a6-1ee618c161d0&iid=b423c053-e205-4482-8d26-afc5a4a111db&index=stubhub&ut=6c568e86768074f19b061224ac4b40e400ca4dfb&quantity=1';
  // const url = 'https://www.stubhub.com/electric-daisy-carnival-las-vegas-tickets-5-15-2026/event/158340054/';

  try {
    // 1) Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        // Spoof a real browser user-agent just in case
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const html = await response.text();

    // 2) Load into Cheerio and grab the data-price attribute
    const $ = cheerio.load(html);
    const priceStr = $('#listings-container > div > div').attr('data-price');
    console.log('what is this?', priceStr);
    const priceNoDollar = priceStr.replace('$',"");
    console.log(priceNoDollar);
    const price = parseFloat(priceNoDollar);

    if (isNaN(price)) {
      throw new Error(`Could not parse price from "${priceStr}"`);
    }
    console.log(price);
    // 3) Return JSON
    res.json({ price });
  } catch (err) {
    console.error('Scrape error:', err);
    res.status(500).json({ error: 'Failed to fetch price' });
  }
});

export default router;
