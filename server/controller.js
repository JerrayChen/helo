const bcrypt = require('bcryptjs');
module.exports = {
    register,
}

function register(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
    db.checkEmail(email).then(found => {
        // console.log(found);

        if(!username){
            res.status(411).json("Username is empty!");
            throw new Error("Username is empty!");
        }
        if(!password){
            res.status(411).json("Password is empty!");
            throw new Error("Password is empty!");
        }
        if(!email){
            res.status(411).json("Email is empty!");
            throw new Error("Email is empty!");
        }

        if (found[0]) {
            res.status(409).json("Email taken");
            throw new Error("Email taken");
        } else {
            return bcrypt.genSalt(12);
        }
    }).then(salt => {
        return bcrypt.hash(password, salt);
    }).then(hash => {
        return db.registerCustomer(email, username, hash);
    }).then(newUser => {
        req.session.customer = {
            customer_id: newUser[0].customer_id,
            email: newUser[0].email,
            username: newUser[0].username
        }
        res.status(201).json(req.session.customer);
    }).catch(err => {
        console.log("this is err msg:", err)
    });

}