const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.generateHash=(password)=>{
  return new Promise((resolver,reject)=>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
           if(err){
             console.log(err)
             reject(false)
           }else{
            resolver(hash); 
           }
         
        });
    }); 
  })   
}
exports.checkHash=(password,passwordHash)=>{
  return new Promise((resolver,reject)=>{

    bcrypt.compare(password, passwordHash ,function(err, result) {

        if(err){
           reject(err);
        
        }else{
          resolver(result);
        }
      });

  })

} 
