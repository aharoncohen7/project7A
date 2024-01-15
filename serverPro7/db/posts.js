const pool = require('./main');

// כל הפוסטים
async function getAllPosts() {
    const SQL = `select * from posts`;
    const [posts] = await pool.query(SQL);
    // console.log(posts);
    return posts;
}

// מיון לפי א ב
async function getPostsOrderTitle() {
    const SQL = `select * from posts
    ORDER BY title;`;
    const [posts] = await pool.query(SQL);
    // console.log(posts);
    return posts;
}
// מיון לפי מזהה

async function getPostsOrderId() {
    const SQL = `select * from posts
    ORDER BY id;`;
    const [posts] = await pool.query(SQL);
    // console.log(posts);
    return posts;
}

// פוסט מסויים
async function getCertainPost(postId) {
    const SQL = `select * from posts where id = ?`;
    const [[post]] = await pool.query(SQL, [postId]);
    console.log(post);
    return post;
}

// לפי כותרת
async function searchPostByTitle(title) {
    const SQL = `SELECT * FROM posts
    WHERE title LIKE '${title}%';`;
    const [respons] = await pool.query(SQL);
    return respons;
}

// לפי מזהה
async function searcById(id) {
    const SQL = `SELECT * FROM posts
    WHERE id LIKE '${id}%';`;
    const [respons] = await pool.query(SQL);
    return respons;
}

// הוספה
async function addPost(userId, title, body) {
    // console.log("addPost() ");
    const SQL = `insert into posts (userId, title, body) 
    values (?, ?, ?)`;
    const [respons] = await pool.query(SQL, [userId, title, body]);
    const newPost = await getCertainPost(respons.insertId)
    // console.log(newPost);
    return newPost;
}

// עריכה
async function editPost(postId, title, body) {
    const SQL = `update posts set title = ?, body = ?
    where id = ?`;
    const [respons] = await pool.query(SQL, [title, body, postId]);
    const updatedPost = await getCertainPost(postId)
    return updatedPost;
}

// מחיקה
async function deletePost(postId) {
    const deletedPost = await getCertainPost(postId)
    const SQL = `delete from posts where id = ?`;
    const [respons] = await pool.query(SQL, [postId]);
    return  deletedPost;
}




// async function test(){
//     const data = await searcById(12);
//     console.log(data);

// }
// test()


module.exports = {
    getAllPosts,
    getPostsOrderId,
    getPostsOrderTitle,
    getCertainPost,
    searchPostByTitle,
    searcById,
    addPost,
    editPost,
    deletePost
};