const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db, call } = require('../config/database');
const saltRounds = 10;

class Auth{
    static login = (req, res) => {
        const { login, password } = req.body;

        db.query("call Login(?)", [login], (databaseError, databaseResponse) => {
            if(databaseError) res.status(500).json({ err: 'database error' });
            if(databaseResponse[0].length === 0) res.json({ msg: 'invalid login or password' });
            else{
                const databaseHashedPassword = databaseResponse[0][0].password;
                bcrypt.compare(password,databaseHashedPassword, (err, result) => {
                    if(err) res.json({ err: 'server error' });
                    if(result === false){
                        res.json({ msg: 'invalid login or password' });
                    }else{
                        const token = jwt.sign(
                            databaseResponse[0][0].id, //Hashing our user id to token
                            process.env.TOKEN_SECRET_KEY //using this secret key from our env file
                        );
                        res.json({ msg: 'login success', token });
                    }
                });
            }
        });
    }
    static register = (req, res) => {
        const { 
            username, 
            password, 
            email,
            firstname,
            lastname 
        } = req.body;
        bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
            if(err) throw err;
            db.query("call Register(?,?,?,?,?)", [
                username,
                email,
                firstname,
                lastname,
                hashedPassword
            ], (databaseError, databaseResponse) => {
                if(databaseError) res.status(500).json({msg: 'Database error'});
                res.status(200).json(databaseResponse[0][0]);
            });
        });
    }
    static getUserData = async (req, res) => {
        const { userId } = req;
        if(userId) {
            const [[ userInfo ]] = await call('GetUsers', [userId]);
            res.json(userInfo);
        }else {
            res.status(404).json({ err: 'no token' });
        }
    }
}

module.exports = Auth;