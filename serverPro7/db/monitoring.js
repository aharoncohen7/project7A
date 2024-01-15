const Joi = require("joi");
const pool = require('./main');

//Get specific user
async function getUser(id) {
    // console.log("in getUser() ");
    const SQL = `select * from users where id = ?`;
    const [[user]] = await pool.query(SQL, [id]);
    // console.log(user);
    return user;
}

// Comparing username to password
async function checkUser(username, password) {
    const SQL = `SELECT id, username, password
   FROM users
   JOIN passwords ON users.id = passwords.userId
    where username = ? and  password = ?`
    const [[user]] = await pool.query(SQL, [username, password]);
    if (user === undefined) {
        return 0;
    }
    else { 
        return user.id;
     }
}

// User authentication
async function authenticate(req, res, next) {
    try {
        const auth = req.headers.auth;
        if (!isValidAuth(auth)) {
            res.status(400).send("Invalid auth");
            return;
        }
        const [username, password] = auth.split(':');
        
        const check = await checkUser(username, password);
        if (!check) {
            res.status(400).send("You are not authorized!")
            return;
        }
        const user = await getUser(check)
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

// AUTH check
function isValidAuth(auth) {
    if (!auth) {
      return false;
    }
    const parts = auth.split(':');
    return parts.length === 2 && parts.every(part => part.length > 0);
  }

// validation params
function validationParams(req, res, next) {
    const schema = Joi.number().min(1);
    const { error } = schema.validate(req.params.postId || req.params.userId
         ||req.params.todoId ||req.params.commentId||req.params.albumId || req.params.photoId);
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }
    next();
};

// New post validation
function handleNewPost(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().max(20).required(),
        body: Joi.string().max(40).required(),
        userId: Joi.number().min(1).max(10).required()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}


// New photo validation
function handleNewPhoto(req, res, next) {
    console.log("handleNewPhoto");
    const schema = Joi.object({
        title: Joi.string().max(20).required(),
        url: Joi.string().required(),
        albumId: Joi.number().min(1).required(),
        userId: Joi.number().min(1).max(10).required()
       
    })
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error.details[0].message);
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}


// New photo validation
function handleEditPhoto(req, res, next) {
    console.log("handleEditePhoto");
    const schema = Joi.object({
        title: Joi.string().max(80).required(),
        url: Joi.string().required(),
        albumId: Joi.number().min(1).required(),
                       
    })
    const { error } = schema.validate(req.body);
    if (error) {
        console.error(error.details[0].message);
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}



//Validation post editing
function handleEditPost(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().max(20).required(),
        body: Joi.string().max(40).required(),
    })
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}

// validation todos execution mode
function validationState(req, res, next) {
    const schema = Joi.number().min(0).max(1);
    const { error } = schema.validate(req.params.state);
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }
    next();
};

// Validate adding a new TODO
function handleNewTodo(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().max(20).required(),
        userId: Joi.number().min(1).max(10).required()
    })
    const { error } = schema.validate( req.body );
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}

// Validate edit todo
function handleEditTodo(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().max(20).required(),
    })
    const { error } = schema.validate( req.body );
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}

// Validate adding a new comment
function handleNewComment(req, res, next) {
    const schema = Joi.object({
        body: Joi.string().max(20).required(),
        postId: Joi.number().min(1).required()
    })
    const { error } = schema.validate( req.body );
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}


module.exports = {
    getUser,
    authenticate,
    validationParams,
    handleNewPost,
    handleEditPost,
    handleEditTodo,
    handleNewTodo,
    validationState,
    handleNewComment,
    handleNewPhoto,
    handleEditPhoto
   };
   
   
   
   
//    קבלת סיסמה
//    async function getPassword(id) {
//        console.log("in getPassword() ");
//        const SQL = `select * from PASSWORDS where userId = ?`;
//        const [[user]] = await pool.query(SQL, [id]);
//        console.log(user);
//        return user;
//    }
   