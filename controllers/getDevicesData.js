///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////

'use strict';
const deviceData = require("./helpers/deviceData");

var TOKEN =
  "eXc90LwptTxe9BJAphoEpxvjytPxyELFECVI8fnFDl97wQ5cTYfiILQ8Cj66AOrzq23prUWuSMQQbzNgCx10Q75Pf9GwDhwPzidw";

// var CloudApi = require("mbed-connector-api");

// var api = new CloudApi({
//   accessKey: TOKEN
// });

/* This function is responsible for handling ARMmbed life-cycle functions-
*  and its call */
function getEndpointsData(callback) {
  var registeredEndpoints = [];
  var rawDataFromEndpointsResources = [];
  /* initiate the life cycle by long-Polling */
  api.startLongPolling(function (error) {
    if (error) {
      console.log(error);
    } else {
      /* Get all connected/Active devices/Endpoints */
      api.getEndpoints(function (error, endpoints) {
        if (error) {
          console.log(error);
        }
        var endpointCounter = 0;

        endpoints.forEach(function (endpoint) {
          registeredEndpoints.push(endpoint.name);
          endpointCounter = endpointCounter + 1;
          /* Get all resources of every endpoint */
          api.getResources(endpoint.name, function (error, resources) {
            if (error) {
              console.log(error);
            }
            console.log("====EndPoint Resources====", resources);
            var resourceCounter = 0;
            resources.forEach(function (resource) {
              /* Put all resources into subscription */
              api.putResourceSubscription(endpoint.name, resource.uri, function (error) {
                /* No action is required*/
              });

              /* Get resource value from all resources uri */
              api.getResourceValue(endpoint.name, resource.uri, function (error, value) {
                resourceCounter = resourceCounter + 1;
                var dataFromArmmbed = {
                  endpointName: endpoint.name,
                  resourceUri: resource.uri,
                  value: value
                };
                rawDataFromEndpointsResources.push(dataFromArmmbed);
                if (endpointCounter == endpoints.length) {
                  if (resourceCounter == resources.length) {
                    callback(rawDataFromEndpointsResources, registeredEndpoints);
                  }
                }
              });
            });
          });
        });
      });
    }
  });
  // Notifications channel
  api.on("notification", function (notification) {
    console.log("Got a notification", notification);
    if (notification.ep !== "5cfab0bf-d5ad-4daf-a174-a4457387c924") {
      console.log("============ Android notification", notification);
    }
  });
}


/* Exported Functions */
module.exports = {
  getEndpointsData: getEndpointsData,
};

///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////