/* 
This file will contain all the objects and configurations related to aws sdk.
*/

var proxy = require('proxy-agent');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set your region for future requests.
AWS.config.region = 'us-east-1';
// Enable logger if required
// AWS.config.logger = process.stdout;

// Enable the proxy when connected to Deere network

if (process.env.PROXY !== 'false') {
    AWS.config.update({ httpOptions: { agent: proxy('http://proxy.dpn.deere.com:81') } });
}

//This was added to reduce the "TimeoutError: Missing credentials in config, message: 'Missing credentials in config'" error that happen randomly.
AWS.config.update({ httpOptions: { timeout: 10000 } });

var ec2 = new AWS.EC2();
//var s3 = new AWS.S3();
var ssm = new AWS.SSM();

//DynamoDB specific configuration

var docClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB();

module.exports = {
    ec2: ec2,
    ssm: ssm,
    docClient: docClient,
    dynamodb: dynamodb
};

// How to use the exported objects to other files. 

//create object of the file
//var aws_base = require('../common/aws_base');

// use the exported methods by calling through this object. 
//aws_base.ec2.describeInstances(params, function (err, data) { });