const pool = require('./main');

//קבלת כל התמונות של אלבום
async function getPhotos(albumId) {
    // console.log("getPhotos() ");
    const SQL = `select * from photos where albumId = ? ORDER BY id DESC;`;
    const [photos] = await pool.query(SQL, [albumId]);
    // console.log(photos);
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
    // console.log("getCertainPhoto() ");
    const SQL = `select * from photos where id = ?`;
    const [photo] = await pool.query(SQL, [photoId]);
    // console.log(photo);
    return photo;
}

// הוספה
async function addPhoto(albumId, title, url) {
    console.log("addPhoto() ");
    const SQL = `insert into photos (albumId, title, url, thumbnailUrl) 
    values (?, ?, ?, ?)`;
    const [respons] = await pool.query(SQL, [albumId, title, url, url]);
    const newPhoto = await getCertainPhoto(respons.insertId)
    console.log(newPhoto);
    return newPhoto;
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
    // console.log("deletePhoto() ");
    const [deletedPhoto] = await getCertainPhoto(photoId)
    const SQL = `delete from photos where id = ?`;
    const [[photo]] = await pool.query(SQL, [photoId]);
    // console.log(typeof photo);
    // console.log(deletedPhoto);
    return photo;
}


// Checking the owner of the album and Fhoto
async function checkOwnerFhoto(albumId) {
    const SQL = `SELECT users.id
    FROM users
    JOIN albums ON users.id = albums.userId
    WHERE albums.id = ?;`;
    const [[response]] = await pool.query(SQL, [albumId]);
    if(response!=undefined){
        return response.id;
    }
    return 0;
}

module.exports = {
    getPhotos,
    get5Photos,
    getCertainPhoto,
    addPhoto,
    editPhoto,
    deletePhoto,
    checkOwnerFhoto
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
//     const data = await addPhoto(1,"test", "https://hahacanvas.co.il/wp-content/uploads/2021/11/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%99%D7%A4%D7%95%D7%AA-%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94-17.jpg")
//     console.log(data);
// }
// test()


