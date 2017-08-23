///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////

'use strict';

/* This is a tree-view scaffolding */
var deviceDataEntriesForTreeView = {
  name: "device_group_01",
  children: []
};

/* This array will keep track of all the device names/identity relevant for specific project*/
var endpointResourcesChildren = [];

/* This function is responsible for mapping raw data coming from ARMmbed to individual device array */

function mapDeviceDataToTree(rawData, endpointNames, callback) {
  var counter = 0;
  rawData.forEach(function (endpointData) {
    /* Increase the counter for proper exit from loop*/
    counter = counter + 1;
    fillEndpointsResourceData(endpointNames, endpointData, function (response) {
      /* No such task is required in callback*/
    });
    
    /* Exit the loop once condition is met*/
    if (counter === rawData.length) {
      callback(null, deviceDataEntriesForTreeView);
    }
  });
}
/* This function is responsible for managing individual device data and its updation */

function fillEndpointsResourceData(endpointNamesArray, endpointInfo, callback) {
  var endpointNotPresent = [];
  deviceDataEntriesForTreeView.children.forEach(function (item) {
    if (endpointNamesArray.indexOf(endpointInfo.endpointName) >= 0) {
      if (item.name === endpointInfo.endpointName) {
        var resource = {
          name: endpointInfo.resourceUri,
          children: [
            { name: endpointInfo.value }
          ]
        };
        item.children.push(resource);
      }
    }
  });
  callback("Success");
}

/* This Function is responsible for inserting device names into tree view scaffoloding */
function createEndpointsEntriesIntoDataTreeView(devicesName, callback) {
  devicesName.forEach(function (device) {
    /* prepare the json schema */
    var treeNode = {
      name: device,
      children: []
    };
    deviceDataEntriesForTreeView.children.push(treeNode);
  });
  var abc = deviceDataEntriesForTreeView;
  callback('Success');
}
/* This function is responsible for maintaining the devices data coming from -
*  notification channels or REST routs of ARMmbed */

function getNotificationFromDevices(resourceData, devices, callback) {
  deviceDataEntriesForTreeView.children = [];
  createEndpointsEntriesIntoDataTreeView(devices, function (response) {
    if (response === 'Success') {
      mapDeviceDataToTree(resourceData, devices, function (error, treeObject) {
        if (treeObject) {
          console.log(treeObject.children);
          callback(null, treeObject);
        } else {
          callback("No data available", null);
        }
      });
    }
  });
}

/* This function will serve the get route for fetching the device data */

function getTreeViewData(callback) {
  if (deviceDataEntriesForTreeView) {
    callback(null, deviceDataEntriesForTreeView);
  } else {
    callback(null, "No data available");
  }
}
/* Exported functions */
module.exports = {
  mapDeviceDataToTree: mapDeviceDataToTree,
  getNotificationFromDevices: getNotificationFromDevices,
  getTreeViewData: getTreeViewData,
};

///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////