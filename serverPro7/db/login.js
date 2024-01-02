const { log } = require('console');
const pool = require('./main');
// const getUser = require('./users');

//השגת סיסמה באמצעות ID

// async function getPasswordByID(id) {
//     console.log("in getPasswordByID() ");
//     const SQL = `select * from PASSWORDS where userId = ?`;
//     const [[user]] = await pool.query(SQL, [id]);
//     console.log(user);
//     return user;
// }

// async function loginOld (username, password) {
//     console.log("in loginOld() ");
//     const userID = await getIdbyPassword(password);
//     const userID2 = await getIdbyUsername(username);
//    if(userID!==undefined&&userID2!==undefined){
//      console.log(userID.userId === userID2.id);
//     return (userID.userId === userID2.id)}
//     else {return false;}
// }


async function getIdbyPassword(password) {
    console.log("in getIdbyPassword() ");
    const SQL = `select userId from PASSWORDS where password = ?`;
    const [[theID]] = await pool.query(SQL, [password]);

    if (theID === undefined) {
        console.log("User not found or password incorrect");
        // החזרת ערך ברירת המחדל או ניתוח פעולה נוספת
        return -1; // החזרת ערך ברירת המחדל
    }
    return theID;
}
async function getIdbyUsername(username) {
    console.log("in getIdbyUsername() ");
    const SQL = `select id from users where username = ?`;
    const [[theID]] = await pool.query(SQL, [username]);
    return theID;
}
async function checkUser(username, password) {
    console.log("in checkUser() ");
    const SQL = `SELECT id, username, password
   FROM users
   JOIN passwords ON users.id = passwords.userId
    where username = ? and  password = ?`
    const [[user]] = await pool.query(SQL, [username, password]);
    if (user === undefined) {
        return 0;
    }
    else { 
        console.log(user);
        return user.id; }
}
async function test() {
    // const data = await checkUser("Bret", 'hildegard.org')
    // console.log(data);
}
test()

module.exports = {
    getIdbyPassword,
    getIdbyUsername,
    checkUser
};