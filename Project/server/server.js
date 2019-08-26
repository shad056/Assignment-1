var express = require('express'); //import the express module for better middleware and routing
var fs = require('fs'); //import the fs module for interactivity with the files
var app = express();
var path = require('path'); //import the path module for path parsing/resolution
const http = require('http').Server(app).listen(3000,function(){
  console.log('Server started');
}); //start the server on localhost: port 3000
var bodyParser = require('body-parser'); //import the body parser module to receive parameters/values within the body of the request
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
}); //this allows the Cross origin request
app.use(express.static(path.join(__dirname + '../dist/lab/'))); //path to join the build version of this project

//The following are all the routes (available in the routes folder) matching the requests from the client side:
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
require('./routes/removeuserroute.js')(app,fs);
require('./routes/assignusergroupassis.js')(app,fs);
require('./routes/assignuserrole.js')(app,fs);
require('./routes/addusertogroup.js')(app,fs);
require('./routes/removeuserfromgroup.js')(app,fs);
require('./routes/usergroupchannels.js')(app,fs);


