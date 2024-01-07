const pool = require('./main');

//קבלת כל התמונות של אלבום
async function getPhotos(albumId) {
    console.log("getPhotos() ");
    const SQL = `select * from photos where albumId = ?`;
    const [photos] = await pool.query(SQL, [albumId]);
    console.log(photos);
    return photos;
}

// קבלת 5 תמונות כפול משתנה
async function get5Photos(albumId, num) {
    const SQL = `SELECT * FROM photos
    WHERE id >= ${((albumId * 50 )- 49)} AND id <= ${albumId * 50}
    ORDER BY id
    LIMIT ${5 * num};`
    const fivePhotos = await pool.query(SQL)
    return fivePhotos;
  }

// קבלת תמונה מסויימת
async function getCertainPhoto(photoId) {
    console.log("getCertainPhoto() ");
    const SQL = `select * from photos where id = ?`;
    const [photo] = await pool.query(SQL, [photoId]);
    console.log(photo);
    return photo;
}
// עריכת תמונה
async function editPhoto(photoId, title, url) {
    const SQL = `update photos set title = ?, url = ?
    where id = ?`;
    const [respons] = await pool.query(SQL, [title, url, photoId]);
    const updatedPhoto = await getCertainPhoto(photoId)
    return updatedPhoto;
}

// מחיקת תמונה
async function deletePhoto(photoId) {
    console.log("deletePhoto() ");
    const [deletedPhoto] = await getCertainPhoto(photoId)
    const SQL = `delete from photos where id = ?`;
    const [[photo]] = await pool.query(SQL, [photoId]);
    console.log(typeof photo);
    console.log(deletedPhoto);
    return photo;
}

module.exports = {
    getPhotos,
    get5Photos,
    getCertainPhoto,
    editPhoto,
    deletePhoto,
};













// חיפוש תמונה לפי כותרת
// async function searchPhotoByTitle(title) {
//     const SQL = `SELECT * FROM photos
//     WHERE title LIKE '${title}%';`;
//     const [respons] = await pool.query(SQL);
//     return respons;
// }
// חיפוש לפי מזהה-
// async function searcById(id) {
//     const SQL = `SELECT * FROM photos
//     WHERE id LIKE '${id}%';`;
//     const [respons] = await pool.query(SQL);
//     return respons;
// }

// async function test(){
//     const data = await searchPhotos("a")
//     console.log(data);
// }
// test()


