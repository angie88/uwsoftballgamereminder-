const Hapi = require('hapi');
const server = new Hapi.Server();
const scraperController = require('./scraper');
server.connection({ port: 3000 });

server.start(()=>{
  console.log('Server running on', server.info.uri);
})
server.route(
  {
    method: 'GET',
    path: '/',
    handler: function(req, reply) {
      //console.log('reply', reply);
      //console.log(request.params.name);
      console.log('req schedule', req.schedule);
      reply();
    }
  }
)

server.ext('onRequest', scraperController.scraper);
