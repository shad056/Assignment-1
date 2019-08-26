module.exports = function(app,fs){
  
  //this route gets all the details of the user
  app.post('/api/groups', function(req,res){
  
      if(!req.body) {
          return res.sendStatus(400);
      }
  
      username = req.body.username;
      var group = [];
      var channel = [];
      var role = [];
      fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            //Some error happended opening the file. No Success
            res.send({group:group,valid:false});
        } else {
        userObj = JSON.parse(data);
        for (let i=0;i<userObj.length;i++){
          if (userObj[i].user == username){
            //find first instance of user name and success
             group = userObj[i].Groups;
            channel = userObj[i].Channels;
            role = userObj[i].Roles;
            res.send({group:group,channel:channel,role:role,valid:true});
            return;
          }
        }
        //no username was found that matched
        res.send({group:group,valid:false});

    }
      
      
        });
  });
  }
  