const { log } = require('console');
const pool = require('./main');

//קבלת משתמש מסוים
async function getUser(id) {
    console.log("in getUser() ");
    const SQL = `select * from users where id = ?`;
    const [[user]] = await pool.query(SQL, [id]);
    console.log(user);
    return user;
}

// async function getPassword(id) {
//     console.log("in getPassword() ");
//     const SQL = `select * from PASSWORDS where userId = ?`;
//     const [[user]] = await pool.query(SQL, [id]);
//     console.log(user);
//     return user;
// }



module.exports = getUser;