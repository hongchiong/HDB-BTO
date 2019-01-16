const puppeteer = require('puppeteer');

// //Web Scraper
async function puppet() {
        const browser = await puppeteer.launch({headless: true});
        let page = await browser.newPage();
        await page.goto('https://services2.hdb.gov.sg/webapp/BP13AWFlatAvail/BP13EBSFlatSearch?Town=Punggol&Flat_Type=BTO&DesType=A&ethnic=Y&Flat=4-Room&ViewOption=A&dteBallot=201808&projName=');

        //get number of blks
        let blks = await page.$$('td');

        let allUnits = [];
        //Repeat for number of Blks. 11 times
        for (let i = 0; i < blks.length; i++) {

            page = await browser.newPage();
            await page.goto('https://services2.hdb.gov.sg/webapp/BP13AWFlatAvail/BP13EBSFlatSearch?Town=Punggol&Flat_Type=BTO&DesType=A&ethnic=Y&Flat=4-Room&ViewOption=A&dteBallot=201808&projName=');

            blks = await page.$$('td');

            let blkBtn = blks[i];
            let btn = await blkBtn.$('a');

            let blkName = await page.evaluate(btn => btn.innerText, btn);

            await blkBtn.click();

            await page.waitForSelector('#blockDetails > div:nth-child(6) > table');
            const units = await page.$$('td');

            for (let j = 0; j < units.length; j++) {
                let u = units[j];
                let unit = await u.$('font');

                let unitsName = await page.evaluate((unit, blkName) => {
                    if (unit.innerText.includes('#')) {

                        return {
                            blkName: blkName,
                            unitNumber: unit.innerText,
                            unitColor: unit.getAttribute('color')
                        };
                    } else {
                        return null;
                    }
                }, unit, blkName);

                allUnits.push(unitsName);
                allUnits = allUnits.filter(ele => ele != null);
            };
            console.log('scraping ;)');
            console.log(`${(allUnits.length/6.45).toFixed(2)} %`);
        };
        console.log('Scrape Done');
        browser.close();
        return await allUnits;
};

module.exports.scrape = puppet();