const pool = require('./main');

// All albums
async function getAlbumsByUserId(id) {
    const SQL = `select * from albums where userId = ?`;
    const [albums] = await pool.query(SQL, [id]);
    return albums;
}

// a particular album
async function getCertainAlbum(albumId) {
    const SQL = `select * from albums where id = ?`;
    const [album] = await pool.query(SQL, [albumId]);

    return album;
}

// Search by title
async function searchAlbums(userId, title) {
    const SQL = `SELECT * FROM albums
    WHERE userId = ?
    AND title LIKE '${title}%';`;
    const [respons] = await pool.query(SQL, [userId]);
    return respons;
}

// Search by ID
async function searcById(userId, id) {
    const SQL = `SELECT * FROM albums
    WHERE userId = ?
    AND id LIKE '${id}%';`;
    const [respons] = await pool.query(SQL, [userId]);
    return respons;
}


// sort by abc
async function getAlbumsOrderTitle() {
    const SQL = `select * from albums
    ORDER BY title;`;
    const [albums] = await pool.query(SQL);
    return albums;
}

// Sort by ID
async function getAlbumsOrderId() {
    const SQL = `select * from albums
    ORDER BY id;`;
    const [albums] = await pool.query(SQL);
    return albums;
}


// async function test(){
//     const data = await searchAlbums("a")
//     console.log(data);
// }
// test()


module.exports = {
    getAlbumsByUserId,
    getCertainAlbum,
    searchAlbums,
    searcById,
    getAlbumsOrderId,
    getAlbumsOrderTitle
};