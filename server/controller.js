const bcrypt = require('bcryptjs');
module.exports = {
    register,
}

function register(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
    db.getUsername(username).then(found => {
        // console.log(found);
        if(!username){
            res.status(411).json("Username is empty!");
            throw new Error("Username is empty!");
        }
        if(!password){
            res.status(411).json("Password is empty!");
            throw new Error("Password is empty!");
        }
        if (found[0]) {
            res.status(409).json("Username taken");
            throw new Error("Username taken");
        } else {
            return bcrypt.genSalt(12);
        }
    }).then(salt => {
        return bcrypt.hash(password, salt);
    }).then(hash => {
        let profile_pic = `https://robohash.org/${Math.floor(Math.random() * 1000)}.png?set=set4`;
        return db.register(username, hash, profile_pic);
    }).then(newUser => {
        req.session.user = {
            userId: newUser[0].id,
            username: newUser[0].username,
            profile: newUser[0].profile_pic
        }
        res.status(201).json(req.session.user);
    }).catch(err => {
        console.log("this is err msg:", err)
    });

}