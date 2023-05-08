import express from 'express'
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs'


const usersRouter = express.Router();

//felhasználó bejelentkezés
usersRouter.post('/login', async (req, res) => {
    const users = await User.findOne({username: req.body.username});
    //ha létezik
    if(users){
        if(bcrypt.compareSync(req.body.password, users.password)) {
            res.send({
                _id: users.id,
                username: users.username
            });
            return;
        }
    }
    res.status(401).send({message: "Helyetelen e-mail vagy jelszó!"});
});

usersRouter.post('/register', async (req, res) => {

        const newUsers = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
        });
        const users = await newUsers.save();
        res.send({
            _id: users.id,
            username: users.username
        });

});

export default usersRouter;