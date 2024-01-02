const pool = require('./main');

// כל התגובות
async function getComments(postId) {
    console.log("getComments() ");
    const SQL = `select * from comments where postId = ?`;
    const [comments] = await pool.query(SQL, [postId]);
    console.log(comments);
    return comments;
}

// קבלת תגובה מסויימת
async function getCertainComment(commentId) {
    console.log("getCertainComment() ");
    const SQL = `select * from comments where id = ?`;
    const [comment] = await pool.query(SQL, [commentId]);
    console.log(comment);
    return comment;
}

//  הוספה
async function addComment(postId, name, email, body ) {
    const SQL = `insert into comments (postId, name, email, body ) values (?, ?, ?, ?)`;
    const [respons] = await pool.query(SQL, [postId, name, email, body]);
    const newComment = await getCertainComment(respons.insertId)
    // console.log(newComment);
    return newComment;
}

// מחיקה
async function deleteComment(commentId) {
    const deletedComment = await getCertainComment(commentId)
    const SQL = `delete from comments where id = ?`;
    const [comment] = await pool.query(SQL, [commentId]);
    // console.log(deletedComment);
    return [comment, deletedComment];
}

// async function test(){
//     const data = await deleteComment(80)
//     console.log(data);
// }
// test()


module.exports = {
    getComments,
    addComment,
    getCertainComment,
    deleteComment
};