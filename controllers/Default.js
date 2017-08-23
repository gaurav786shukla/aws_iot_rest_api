///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////

'use strict';

var url = require('url');

var defaultService = require('./DefaultService');
/* This function is responsible for retrieving ARMmbed connected devices data */
module.exports.getDevices = function getDevices(req, res, next) {
  defaultService.getDevices(req.swagger.params, res, next);
};

module.exports.registerDevice = function registerDevice(req, res, next) {
  defaultService.registerDevice(req.swagger.params, res, next);
};
///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////