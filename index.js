///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////

'use strict';

var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var serverPort = 8080;
//var getDevicesDataClient = require('./controllers/getDevicesData');
//var periodicTasks = require('./controllers/helpers/periodicTasks');

// swaggerRouter configuration
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // periodicTasks.rppPeriodicTasks();

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('rpp-interface is listening on port %d (http://localhost:%d/rpp-interface)', serverPort, serverPort);
    console.log('REST UI is available on http://localhost:%d/docs', serverPort);
  });
});
///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////
