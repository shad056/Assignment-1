module.exports = function(app,fs){
   //This route creates a new channel and checks whether the channel already exists or not
        app.post('/api/createchannel', (req, res) => {
            var isChannel = 0;
            var userObj;
            
            var groups = req.body.group;
           var channelname = req.body.channel;
            fs.readFile('./dataStorage/channels.json','utf-8', function(err, data){
                if (err){
                    console.log(err);
                } else {
                userObj = JSON.parse(data);
                for (let i=0;i<userObj.length;i++){
                  if (userObj[i].Group == groups){
                    //Check for duplicates
                    for(let j=0;j<userObj[i].Channels.length;j++) {
                    if(userObj[i].Channels[j] == channelname) {
                    isChannel = 1;
                    }
                }
                  }
                }
                if (isChannel > 0){
                  //Name already exists in the file
                   res.send({newchannel:'',valid:false});
                 }else{
                  for (let i=0;i<userObj.length;i++){
                    if(userObj[i].Group == groups) {
                        userObj[i].Channels.push(channelname);                   
                         
                    }
                  }
                   //Add name to list of names
                   //userObj.push({'newchannel':group})
                   //Prepare data for writing (convert to a string)
                   var newdata = JSON.stringify(userObj);
                   fs.writeFile('./dataStorage/channels.json',newdata,'utf-8',function(err){
                     if (err) throw err;
                     //Send response that registration was successfull.
                     res.send({newchannel:channelname,valid:true});
                    });
                 }
               }
            })
        });
    }