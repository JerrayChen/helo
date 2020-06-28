const bcrypt = require('bcryptjs');
module.exports = {
    register,
    login,
    getPosts,
    getPost,
    postNewArticle,
    deletePost,
    logout,
    getMe
}

function register(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
    // console.log(req.body);

    db.getUsername(username).then(found => {
        // console.log(found);
        if (!username) {
            res.status(411).json("Username is empty!");
            throw new Error("Username is empty!");
        }
        if (!password) {
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
        req.session.userid = newUser[0].id;
        res.status(201).json(req.session.user);
    }).catch(err => {
        console.log("this is err msg:", err)
    });

}

function login(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
    let foundUser;
    db.getUsername(username).then(found => {
        // console.log(found);
        if (!found[0]) {
            res.status(403).json("Email or password incorrect!");
            throw new Error("Email or password incorrect!");
        } else {
            foundUser = found[0]
            return bcrypt.compare(password, foundUser.password);
        }
    }).then(authUser => {
        if (!authUser) {
            res.status(403).json("Email or password incorrect!");
        } else {
            req.session.user = {
                userId: foundUser.id,
                username: foundUser.username,
                profile: foundUser.profile_pic
            }
            req.session.userid = foundUser.id;
            res.status(200).json(req.session.user);
        }
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}

function getPosts(req, res) {
    const db = req.app.get('db');
    // const { userid } = req.params;
    const userid = req.session.userid;
    // const { userposts } = req.query;
    // eslint-disable-next-line eqeqeq
    const userposts = (req.query.userposts == 'true') ? true : false;
    // console.log(req.query.search);
    const search = `%${(req.query.search === undefined || req.query.search === null) ? '' : req.query.search}%`;

    db.getPosts(search, userid, userposts).then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}

function getPost(req, res) {
    const db = req.app.get('db');
    const { postid } = req.params;

    db.getPost(postid).then(post => {
        res.status(200).json(post[0]);
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}



function postNewArticle(req, res) {
    const db = req.app.get('db');
    // const { userid } = req.params;
    const { userid } = req.session;
    const { title, img, content } = req.body;

    db.postNewArticle(title, img, content, userid).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}

function deletePost(req, res) {
    const db = req.app.get('db');
    const { postid } = req.params;

    db.deletePost(postid).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}



function logout(req, res) {
    req.session.destroy();
    res.status(200).json('logout');
}


function getMe(req, res) {
    const db = req.app.get('db');
    const { userid } = req.session;

    db.getUserById(userid).then(user => {
        res.status(200).json(user[0]);
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}