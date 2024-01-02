const pool = require('./main');

// כל האלבומים
async function getAlbums(id) {
    console.log("getAlbums() ");
    const SQL = `select * from albums where userId = ?`;
    const [albums] = await pool.query(SQL, [id]);
    // console.log(albums);
    return albums;
}

// אלבום מסוים
async function getCertainAlbum(albumId) {
    console.log("getCertainAlbum() ");
    const SQL = `select * from albums where id = ?`;
    const [album] = await pool.query(SQL, [albumId]);
    console.log(album);
    return album;
}

// חיפוש לפי כותרת
async function searchAlbums(userId, title) {
    const SQL = `SELECT * FROM albums
    WHERE userId = ?
    AND title LIKE '${title}%';`;
    const [respons] = await pool.query(SQL, [userId]);
    return respons;
}

// חיפוש לפי מזהה
async function searcById(userId, id) {
    const SQL = `SELECT * FROM albums
    WHERE userId = ?
    AND id LIKE '${id}%';`;
    const [respons] = await pool.query(SQL, [userId]);
    return respons;
}

// async function test(){
//     const data = await searchAlbums("a")
//     console.log(data);
// }
// test()


module.exports = {
    getAlbums,
    getCertainAlbum,
    searchAlbums,
    searcById
};