module.exports = function(app,fs){
  
  
    app.post('/api/removegroup', function(req,res){
    
        if(!req.body) {
            return res.sendStatus(400);
        }
    
        group = req.body.group;
      
        var userObj;
        var userObj2;
     
        fs.readFile('./dataStorage/channels.json', 'utf8', function(err, data) {
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({valid:false});
          } 
          else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if (userObj[i].Group == group){
              //find first instance of user name and success
             
              var index = userObj.indexOf(userObj[i]);
             userObj.splice(index,1);
            
            }
          }
          var newdata = JSON.stringify(userObj);
          fs.writeFile('./dataStorage/channels.json',newdata,'utf-8',function(err){
            if (err) throw err;
            //Send response that registration was successfull.
            // res.send({valid:true});
           });
          //no username was found that matched
        fs.readFile('./dataStorage/users.json','utf8', function(err, data2) {
            if (err) throw err;
            //Send response that registration was successfull.
            userObj2 = JSON.parse(data2);
            
           for (let i=0;i<userObj2.length;i++){
               for(let j=0; j<userObj2[i].Groups.length; j++) {
               if (userObj2[i].Groups[j] == group){
                  //find first instance of user name and success
               var index = userObj2[i].Groups.indexOf(group);
               userObj2[i].Groups.splice(index,1);
              
            
                }
             
            }
              }
              var newdata2 = JSON.stringify(userObj2);
              fs.writeFile('./dataStorage/users.json',newdata2,'utf-8',function(err){
                if (err) throw err;
                //Send response that registration was successfull.
                res.send({valid:true});
               });
             
        });
       
      }
        
        
          });
    });
    }
    