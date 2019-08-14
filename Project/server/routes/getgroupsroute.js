
module.exports = function(app,fs){
  
  
    app.get('/api/getgroups', function(req,res){
    
        var group = [];
        fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({groups:group,valid:false});
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
         
              //find first instance of user name and success
               group.push(userObj[i].Group);
          }
          res.send({groups:group,valid:true});
      }
        
        
          });
    });
    }
    