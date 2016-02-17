const request = require('request');
const cheerio = require('cheerio');


var scraperController = {
  scraper: function(req, reply){
    req.setUrl('/');
    const url = 'http://www.gohuskies.com/SportSelect.dbml?&DB_OEM_ID=30200&SPID=126619&SPSID=777716';
    request(url, (error, response, html) => {
      var $ = cheerio.load(html);
      var counter = 0;
      var counter2 = 1;
      var scheduleArray = [];
      $('.odd').each(function(i, schedule) {
        var date = $(schedule).find($('.date')).children().text();
            date = date + ', 2016';
        var opponent = $(schedule).find($('.opponent')).text().replace(/\n/g, '').replace(/\t/g, '');
        var time = $(schedule).find($('.time')).text().replace(/\n/g, '').replace(/\t/g, '');
        if (i >= 6) {
          scheduleArray[counter] = {date: date, opponent: opponent, time: time};
          counter += 2;
        }
      });

      $('.even').each(function(i, schedule) {
        var date = $(schedule).find($('.date')).children().text();
            date = date + ', 2016';
        var opponent = $(schedule).find($('.opponent')).text().replace(/\n/g, '').replace(/\t/g, '');
        var time = $(schedule).find($('.time')).text().replace(/\n/g, '').replace(/\t/g, '');

        //console.log(date, opponent, time);
        if (i >= 6) {
          scheduleArray[counter2] = {date: date, opponent: opponent, time: time};
          counter2 += 2;
        }
        if (scheduleArray.length > 50) {
          console.log('HEY')
          req.schedule = scheduleArray;
        }

      });
    });
    return reply.continue();
  }
}

module.exports = scraperController;
