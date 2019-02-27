require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const knex = require('knex');
// const knexConfig = require('./knexfile')
// const db = knex(knexConfig.development);
const Users = require('./helpers/users-model.js');

const secret = process.env.JWT_SECRET || 'demo secret MFers'; 
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// Auth/Login API
server.post('/api/register', (req, res) => {
    let user = req.body;
    // generate hash from user's password
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    // override user.password with hash
    user.password = hash;
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});
//Generate Token
function generateToken(user){
  const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
  };
  const options ={
      expiresIn: '1d',
  };
  return jwt.sign(payload, secret, options)
}
server.post('/api/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user)
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!, have a token...`, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// Restricted Function checks if used has a token, if so they can come in
function restricted(req, res, next) {
	const token = req.headers.authorization;
	if(token){
		jwt.verify(token, secret, (err, decodedToken)=>{
			if(err){
				//record the event - tokens been tampered 
				res.status(401).json({message: "can't touch this!"})
			}else{
				req.decodedJWT = decodedToken
				next();
			}
		})
	}else{
		res.status(401).json({message: 'Invalid Credentials'})
	}
}
// Get Users only if logged in
server.get('/api/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({users});
    })
    .catch(err => res.send(err));
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

//Server Starter Sanity Check
// server.get('/', (req, res) => {
//     res.send("sanity check")
// });