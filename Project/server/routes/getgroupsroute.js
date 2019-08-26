
module.exports = function(app,fs){
  
  //this routes gets all the available groups within the channels.json file
    app.get('/api/getgroups', function(req,res){
    
        var group = [];
        fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({group:group,valid:false});
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
         
              //find first instance of user name and success
               group.push(userObj[i].Group);
          }
          res.send({group:group,valid:true});
      }
        
        
          });
    });
    }
    