
module.exports = function(app,fs){
  
  
    app.get('/api/getchannels', function(req,res){
    
        var channels = [];
        fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({channels:channels,valid:false});
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            for(let j=0; j<userObj[i].Channels.length; j++) {
                if (userObj[i].Channels[j] != undefined) {
                    channels.push(userObj[i].Channels[j]);
                }
            }
          }
          res.send({channels:channels,valid:true});
      }
        
        
          });
    });
    }
    