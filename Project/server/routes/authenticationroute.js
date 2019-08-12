module.exports = function(app,fs){
  
  var users = require('./models/users');

app.post('/api/auth', function(req,res){

    if(!req.body) {
        return res.sendStatus(400);
    }

    username = req.body.username;
    
    fs.readFile('./dataStorage/users.json', 'utf8', function(err, data) {
      if(err) throw err;
      let userArray = JSON.parse(data);
     
      let i = userArray.findIndex(user => 
        ((user.user == username)));
        if(i == -1) {
          res.send({valid: false});
       
        }
        else {

          res.send({valid: true, username: username});
        }
    
    
      });
});
}
