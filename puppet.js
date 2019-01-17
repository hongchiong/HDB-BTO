const puppeteer = require('puppeteer');

// //Web Scraper
const puppet = async (start) => {
    if (start) {
        const browser = await puppeteer.launch({headless: true});
        //GO TO URL
        let page = await browser.newPage();
        await page.goto('https://services2.hdb.gov.sg/webapp/BP13AWFlatAvail/BP13EBSFlatSearch?Town=Punggol&Flat_Type=BTO&DesType=A&ethnic=Y&Flat=4-Room&ViewOption=A&dteBallot=201808&projName=');

        //SELECT ALL td TAGS
        let blks = await page.$$('td');

        //Empty Array to store eventual data
        let allUnits = [];
        let allBlks = [];
        //Repeat for number of Blks. 11 times
        for (let i = 0; i < blks.length; i++) {
            //Open new tab for every Blk
            page = await browser.newPage();
            await page.goto('https://services2.hdb.gov.sg/webapp/BP13AWFlatAvail/BP13EBSFlatSearch?Town=Punggol&Flat_Type=BTO&DesType=A&ethnic=Y&Flat=4-Room&ViewOption=A&dteBallot=201808&projName=');

            blks = await page.$$('td');

            let blkBtn = blks[i];
            let btn = await blkBtn.$('a');
            let blkName = await page.evaluate(btn => btn.innerText, btn);
            allBlks.push(blkName);
            //Click Blk Button
            await blkBtn.click();
            //Wait for Units Table
            await page.waitForSelector('#blockDetails > div:nth-child(6) > table');
            //Select All td Tags
            const units = await page.$$('td');
            //Loop Through td Tags
            for (let j = 0; j < units.length; j++) {
                let u = units[j];
                let unit = await u.$('font');
                //Retrieve Each Units Data
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
                //Push each unit's data into allUnits array
                allUnits.push(unitsName);
                allUnits = allUnits.filter(ele => ele != null);
            };
            console.log('scraping ;)');
            //console log scraping percentage
            console.log(`${(allUnits.length/6.45).toFixed(2)} %`);
        };
        //last index used to store Blks array
        allUnits.push(allBlks);
        console.log('Scrape Done');
        browser.close();
        return await allUnits;
    }
};

module.exports.scrape = puppet;