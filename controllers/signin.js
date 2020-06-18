const handleSignin = (db, bcrypt) => (req,res) => {

     const {email, password} = req.body;

     
     if(!email || !password)
     {
          return res.json('Please fill all the Info');
     }

     db.select('email', 'hash').from('login')
     .where('email', '=', email)
     .then(data => {
          const isValid = bcrypt.compareSync(password, data[0].hash);
          if(isValid) {
               return db.select('*').from('users')
               .where('email', '=', email)
               .then(user => {
                    res.json(user[0]);
               })
               .catch(err => res.status(400).json('Unable to find user'))   
          }
          else {
               res.status(400).json('Wrong credentials');     // signin
          }
     })
     .catch(err => res.json('wrong credentials'))    
}

module.exports = { handleSignin }