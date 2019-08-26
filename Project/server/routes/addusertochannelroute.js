module.exports = function(app,fs){

  //This route adds a user to a channel and checks if the user has already been added to this channel or not
    app.post('/api/addusertochannel', (req, res) => {
        var isChannel = 0;
        var userObj;
        var isGroup = 0;
        var user = req.body.user;
       var channel = req.body.channel;
       var channels = [];
       var group = [];
        fs.readFile('./dataStorage/users.json','utf-8', function(err, data){
            if (err){
                console.log(err);
            } else {
            userObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
              if (userObj[i].user == user){
                //Check for duplicates
                for(let j=0;j<userObj[i].Channels.length;j++) {
                if(userObj[i].Channels[j] == channel) {
                isChannel = 1;
                }
            }
              }
            }
          }

            // for (let i=0;i<userObj.length;i++){
            //     if (userObj[i].user == user){
            //       //Check for duplicates
            //       for(let j=0;j<userObj[i].Groups.length;j++) {
            //       if(userObj[i].Groups[j] != undefined)
            //       group.push(userObj[i].Groups[j]);
            //       }
            //     }
            //   }
              
            //   fs.readFile('./dataStorage/channels.json','utf-8', function(err, data){
            //     if (err){
            //         console.log(err);
            //     } else {
            //     userObj2 = JSON.parse(data);
            //     for (let i=0;i<userObj2.length;i++){
            //     for(let j=0; j<group.length; j++)
            //         if(userObj2[i].Group == group[j]) {
            //             for(let k=0; k<userObj2.length;k++) {
            //                 if(userObj2[i].Channels[k] != undefined) {
            //                 channels.push(userObj2[i].Channels[k]);
                              
            //             }
            //             }
            //         }
            //     }
            //     }
            //          for(let i=0; i<channels.length; i++) {
            //       if(channels[i] != channel) {
            //          isGroup = 1;
                
            //       }
            //   }
              if (isChannel > 0){
                //Name already exists in the file
                 res.send({newchannel:'',valid:false});
               }
               else{
                for (let i=0;i<userObj.length;i++){
                  if(userObj[i].user == user) {
                      userObj[i].Channels.push(channel);                   
                       
                  }
                }
                 //Add name to list of names
                 //userObj.push({'newchannel':group})
                 //Prepare data for writing (convert to a string)
                 var newdata = JSON.stringify(userObj);
                 fs.writeFile('./dataStorage/users.json',newdata,'utf-8',function(err){
                   if (err) throw err;
                   //Send response that registration was successfull.
                   res.send({user:user,channel:channel,valid:true});
                  });
               }
              });
         

            
           });
     
}