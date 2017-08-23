///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////

'use strict';
const fs = require('fs');
const path = require('path');
const deviceData = require('./helpers/deviceData');

/* This function will serve the GET -/devices requests of this REST API*/
function getDevices(args, res, next) {
  /* Gets devices data object from ARMmbed connector.*/
  // getDevicesData(function (err, data) {
  //   if (data) {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     res.setHeader('Access-Control-Allow-Methods', '*');
  //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  //     res.end(JSON.stringify(data));
  //   }
  //   res.end();
  // });
}

/* 

This function is will serve the POST -/device-registration requests of the REST API.
Consumes - application/json
{
"uniqueId":"unique_Device_Id"	
}
Produces - application/json
'Successful' of 'Failure' string.  

*/

function registerDevice(args, res, next) {
  res.end(JSON.stringify('Successful'));
} 

// function getDevicesData(callback) {
//   /* Get content from file */

//   deviceData.getTreeViewData(function (err, data) {
//     if (data) {
//       return callback(null, data);
//     }
//   });
// }
/* Exported functions */
module.exports = {
  getDevices: getDevices,
  registerDevice: registerDevice
};

///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////