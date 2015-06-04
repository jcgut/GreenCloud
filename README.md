Greencloud
===================

Greencloud is a node.js application for user and dns manager from [Cloudflare][cloudflare]. This manager used the [API 4][apiCloudflare] released from Cloudflare. 
The users are stored in [MongoDB][mongodb], and the necessary cURL to connect to Cloudflare's database are send by **[request.js][request]** 


Requisite
-------------

 -  ***[Node.js][nodejs]*** 
 Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.

> **If you have not install it**
> [Download][donwloadNodejs] and Install Node.js, [nodeschool][nodeschool] has free  node tutorials to get you started.

 - ***[MongoDB][mongodb]***
MongoDB is a NoSQL database, go through MongoDB Official Website and learn more about it. As an additional help, here is a guide than widely explain the differences betweend [SQL and NoSQL ][guideSQL]

> **If you have not install it**
> [Download][donwloadMongodb] and Install mongodb. Checkout their [manual][manualMongodb] if you're just starting.

If you don't know how to install them, here is a guide [NodeJS and MongoDB][guide]
	

Instalation
-------------
In the terminal, run the next commands.

    $ npm install
    $ node app.js
Then change this three lines: 

 - On routes/index.js, the email ande the api key from cloudflare.
``` javascript
  var email = "user@example.com",
    key = "c2547eb745079dac9320b638f5e225cf483cc5cfdda41";
```
 - On public/js/dnsTable, change localhost for the route of your page.
``` javascript
  var socket = io.connect('http://localhost:3002');
```


Usage
---------------

#### **Execute cURL with request.js**

The commands from Cloudflare's API 4  are cURL. For example to listing zones register on your accound, is needed the email's account and the api key (It can be found on the accound settings).

``` javascript
$ curl -X GET "https://api.cloudflare.com/client/v4/zones?name=example.com&status=active&page=1&per_page=20&order=status&direction=desc&match=all"\
 -H "X-Auth-Email: user@example.com"\ 
 -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"\
 -H "Content-Type: application/json"
```
On node.js run cURL commands is possible with request.js. For the same example the command would be this way.

```javascript
var options = {
  url: 'https://api.cloudflare.com/client/v4/zones?name=example.com&status=active&page=1&per_page=20&order=status&direction=desc&match=all',
  headers: {
     'X-Auth-Email': user@example.com,
     'X-Auth-Key': c2547eb745079dac9320b638f5e225cf483cc5cfdda41,
     'Content-Type': 'application/json'     
  }
}
request(options,function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
});
```

----------

License
------------
***AGPL License***

[cloudflare]: https://www.cloudflare.com/
[apiCloudflare]: https://api.cloudflare.com/
[donwloadNodejs]: http://nodejs.org/download/
[donwloadMongodb]: http://www.mongodb.org/downloads
[nodejs]: http://www.nodejs.org/
[nodeschool]: http:nodeschool.io/#workshoppers
[mongodb]: http://www.mongodb.org/
[manualMongodb]: http://docs.mongodb.org/manual
[guide]: https://github.com/rodrigopolo/node-mongo-demo/tree/master/install_instructions
[guideSQL]: http://code.tutsplus.com/articles/mapping-relational-databases-and-sql-to-mongodb--net-35650
[request]: https://www.npmjs.com/package/request
[agpl]: http://www.gnu.org/licenses/