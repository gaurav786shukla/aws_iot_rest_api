///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////

'use strict';

/* required files*/
const schedule = require('node-schedule');
const getDeviceData = require('../getDevicesData');
const deviceData = require('./deviceData');
const async = require('async');

/* this function will handle all the periodic tasks required for this rest back-end */

function rppPeriodicTasks() {
    getEndpointsDataPeriodicTask();
}

/* this function will get the data from armmbed in every specified seconds */

function getEndpointsDataPeriodicTask() {
    const taskSchedule = new schedule.RecurrenceRule();

    /* schedule this call in every N seconds*/
    taskSchedule.second = [20, 40];
    schedule.scheduleJob(taskSchedule, function () {

        /* This task will be an aysnc task : 
        *  1- updates the endpoint data.
        *  2- puts the data into proper manner for data tree view.
        */

        async.waterfall(
            [
                updateEndPointData,
                fetchTreeViewData,
            ],
            function (err, result) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    console.log('============ Results updated ===========');
                }
            });
    });
}

/* This function is responsible for getting data from ARMmbed */

function fetchTreeViewData(rawData, deviceNames, callback) {
    deviceData.getNotificationFromDevices(rawData, deviceNames, function (error, response) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, response);
        }
    });
}

/* This function is responsible for updating the fetched data into Tree view */
function updateEndPointData(callback) {
    getDeviceData.getEndpointsData(function (dataFromMbed, endpoint) {
        if (dataFromMbed) {
            callback(null, dataFromMbed, endpoint);
        };
    });
}

/* Exported funcitons */
module.exports = {
    rppPeriodicTasks: rppPeriodicTasks,
};

///////////////////////////////////////////////////////////////////////////////
// Copyright (c) Bose Corporation as an unpublished work
// THIS SOFTWARE AND/OR MATERIAL IS THE PROPERTY OF Bose Corporation.  ALL USE,
// DISCLOSURE, AND/OR REPRODUCTION NOT SPECIFICALLY AUTHORIZED BY Bose - 
// Corporation IS PROHIBITED.
///////////////////////////////////////////////////////////////////////////////