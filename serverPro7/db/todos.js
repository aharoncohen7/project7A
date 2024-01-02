const pool = require('./main');

// קבלת כל משימות
async function getTodosByUserId(id) {
    console.log("getTodos() ");
    const SQL = `select * from todos where userId = ?`;
    const [todos] = await pool.query(SQL, [id]);
    console.log(todos);
    return todos;
}

// קבלת מסוים
async function getCertainTodo(todoId) {
    console.log("getCertainTodo() ");
    const SQL = `select * from todos where id = ?`;
    const [todo] = await pool.query(SQL, [todoId]);
    console.log(todo);
    return todo;
}

// לפי כותרת
async function searchTodo(userId, title) {
    const SQL = `SELECT * FROM todos
    WHERE userId = ? AND
    title LIKE '${title}%';`;
    const [respons] = await pool.query(SQL, [userId]);
    return respons;
}

// לפי מזהה
async function searcById(userId, id) {
    const SQL = `SELECT * FROM todos
    WHERE userId = ? AND
    id LIKE '${id}%';`;
    const [respons] = await pool.query(SQL, [userId]);
    return respons;
}

// הוספה
async function addTodo(userId, title) {
    const SQL = `insert into todos (userId, title) 
    values (?, ?)`;
    const [respons] = await pool.query(SQL, [userId, title]);
    const newTodo = await getCertainTodo(respons.insertId)
    // console.log(newTodo);
    return newTodo;
}

// עדכון מצב ביצוע
async function updateCompleted(todoId) {
    const SQL = 'UPDATE todos SET completed= NOT completed WHERE id = ?';
    const [respons] = await pool.query(SQL, [ todoId]);
    const updatedTodo = await getCertainTodo(todoId)
    return updatedTodo;
}

// עריכה
async function editTodo(todoId, title) {
    const SQL = `update posts set title = ?
    where id = ?`;
    const [respons] = await pool.query(SQL, [title, todoId]);
    const updatedTodo = await getCertainTodo(todoId)
    return updatedTodo;
}

// מחיקה
async function deleteTodo(todoId) {
    const deletedTodo = await getCertainTodo(todoId)
    const SQL = `delete from todos where id = ?`;
    const [todo] = await pool.query(SQL, [todoId]);
    console.log(deletedTodo);
    return [todo, deletedTodo];
}


// async function test(){
//     const data = await getTodosByUserId(1);
//     console.log(data);
    
// }
// test()

module.exports = {
    getTodosByUserId,
    getCertainTodo,
    searchTodo,
    searcById,
    addTodo,
    updateCompleted,
    editTodo,
    deleteTodo
};

