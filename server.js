const express = require('express');
const app = express();
const scraperController = require('./scraper');

app.listen(3000);

app.get('/', scraperController.scraper);
