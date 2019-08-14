module.exports = function(app,fs){
    //Route to manage user logins
      app.post('/api/createuser', (req, res) => {
    
          var isGroup = 0;
          var userObj;
        
          var uname = req.body.user;
          var email = req.body.email;
    
          fs.readFile('./dataStorage/users.json','utf-8', function(err, data){
              if (err){
                  console.log(err);
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                if (userObj[i].user == uname){
                  //Check for duplicates
                  isGroup = 1;
                }
              }
              if (isGroup > 0){
                //Name already exists in the file
                 res.send({user:'',valid:false});
               }else{
                 //Add name to list of names
                 userObj.push({'user':uname,"email": email, "Groups":[], "Roles":[], "Channels":[]});
                 //Prepare data for writing (convert to a string)
                 var newdata = JSON.stringify(userObj);
                 fs.writeFile('./dataStorage/users.json',newdata,'utf-8',function(err){
                   if (err) throw err;
                   //Send response that registration was successfull.
                   res.send({user:uname,valid:true});
                  });
               }
             }
          })
        });
    }