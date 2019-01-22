# HDB-BTO
The project intends to display HDB BTO data in a more user-friendly presentation, and more functionalities.

Original Site: https://services2.hdb.gov.sg/webapp/BP13AWFlatAvail/BP13SEstateSummary?sel=BTO

## Tech Used
### Puppeteer
As the HDB BTO data is not readily available as an API, I had to build a scraper to extract the necessary data from the website.

### async
Used the async package to deal with nested database queries.

## Things to Work On
1. Generalize the scraper to scrape all BTO data, as currently it is only for one specific BTO project
2. Allow users to select units they wish to track.
3. Notify users when the units they are tracking is selected.
