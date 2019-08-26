

module.exports = function(app,fs){
  //this route fetches all the channels available in a group
  
    app.post('/api/usergroupchannels', function(req,res){
            var user = req.body.username;
            var group = [];
        var channels = [];
        fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({channel:channels,valid:false});
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if(userObj[i].user == user){
                group = userObj[i].Groups;
            }
          }

          fs.readFile('./dataStorage/channels.json', 'utf8', function(err,data2) {
            if (err) {
                console.log(err);
                //Some error happended opening the file. No Success
                res.send({channel:channels,valid:false});
            }
            else {
                userObj2 = JSON.parse(data2);
                for(let i=0; i<userObj2.length;i++) {
                    for(let j=0;j<group.length;j++) {
                        
                        if(userObj2[i].Group == group[j]) {
                            for(let k=0;k<userObj2[i].Channels.length;k++) {
                                channels.push(userObj2[i].Channels[k]);
                            }
                            
                            
                        }
                    } 
                  
                }
                res.send({channel:channels,valid:true});
            }

          });
         
          //res.send({channel:channels,valid:true});
      }
        
        
          });
    });
    }
    