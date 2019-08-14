var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
const http = require('http').Server(app).listen(3000,function(){
  console.log('Server started');
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use(express.static(path.join(__dirname + '../dist/lab/')));

require('./routes/accountroute.js')(app,path);
require('./routes/authenticationroute.js')(app,fs);
require('./routes/groupsroute.js')(app,fs);
require('./routes/channelsroute.js')(app,fs);
require('./routes/creategrouproute.js')(app,fs);
require('./routes/createuserroute.js')(app,fs);
require('./routes/createchannelroute.js')(app,fs);
require('./routes/getgroupsroute.js')(app,fs);
require('./routes/getchannelsroute.js')(app,fs);
require('./routes/getusersroute.js')(app,fs);
require('./routes/addusertochannelroute.js')(app,fs);
require('./routes/removegrouproute.js')(app,fs);
require('./routes/removechannelroute.js')(app,fs);
require('./routes/removeuserfromchannel.js')(app,fs);


