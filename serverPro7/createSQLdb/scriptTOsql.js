const fs = require('fs/promises');
const mysql = require('mysql2/promise');

let dbName = "db";
let num = 0;

// פרטי חיבור לבסיס הנתונים
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '--------',
  // database: 'sm_users'
};

// יצירת חיבור לבסיס הנתונים באמצעות connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  multipleStatements: true,
});

// קריאת קובץ JSON
async function readJsonFile(filePath) {
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    throw error;
  }
}

// יצירת טבלאות
async function createTables() {
  try {

    const dropSchema = `DROP DATABASE IF EXISTS ${dbName}`
    const createSchema  = `CREATE DATABASE IF NOT EXISTS ${dbName};`

    const sqlUsers = `CREATE TABLE ${dbName}.users (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            name TEXT,
            username TEXT,
            email TEXT,
            phone TEXT,
            website TEXT
        )`;
    const sqlPosts = `CREATE TABLE ${dbName}.posts (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            userId INT,
            title TEXT,
            body TEXT,
            FOREIGN KEY (userId) REFERENCES ${dbName}.users(id)
        )`;
    const sqlComments = `CREATE TABLE ${dbName}.comments (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            postId INT,
            name TEXT,
            email TEXT,
            body TEXT,
            FOREIGN KEY (postId) REFERENCES ${dbName}.posts(id)
        )`;
    const sqlAlbums = `CREATE TABLE ${dbName}.albums (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            userId INT,
            title TEXT,
            FOREIGN KEY (userId) REFERENCES ${dbName}.users(id)
        )`;
    const sqlPhotos = `CREATE TABLE ${dbName}.photos (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            albumId INT,
            title TEXT,
            url TEXT,
            thumbnailUrl TEXT,
            FOREIGN KEY (albumId) REFERENCES ${dbName}.albums(id)
        )`;
    const sqlTodos = `CREATE TABLE ${dbName}.todos (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            userId INT,
            title TEXT,
            completed TINYINT(1),
            FOREIGN KEY (userId) REFERENCES ${dbName}.users(id)
        )`;
    const sqlPasswords = `CREATE TABLE ${dbName}.passwords (
            userId INT,
            password TEXT,
            FOREIGN KEY (userId) REFERENCES ${dbName}.users(id)
        )`;

    // const insertPasswords = `INSERT INTO ${dbName}.passwords (userId, password)
    //     VALUES 
    //     (1, 'hildegard.org'),
    //     (2, 'anastasia.net'),
    //     (3, 'ramiro.info'),
    //     (4, 'kale.biz'),
    //     (5, 'demarco.info'),
    //     (6, 'ola.org'),
    //     (7, 'elvis.io'),
    //     (8, 'jacynthe.com'),
    //     (9, 'conrad.com'),
    //     (10, 'ambrose.net');
    //     `;

    await pool.execute(dropSchema);
    await pool.execute(createSchema);
    await pool.execute(sqlUsers);
    await pool.execute(sqlPosts);
    await pool.execute(sqlComments);
    await pool.execute(sqlAlbums);
    await pool.execute(sqlPhotos);
    await pool.execute(sqlTodos);
    await pool.execute(sqlPasswords);

  } catch (error) {
    console.error(`Error creating tables`, error.message);
  }
}

// פונקציה להכנסת נתונים לטבלה
async function insertDataIntoTable(tableName, data) {
  const columns = Object.keys(data[0]).join(', ');

  try {
    for (const item of data) {
      const placeholders = Array(Object.keys(item).length).fill('?').join(', ');
      const sql = `INSERT INTO ${dbName}.${tableName} (${columns}) VALUES (${placeholders})`;

      const values = Object.values(item);
      const [rows] = await pool.execute(sql, values);
      console.log(`Inserted ${tableName} record with ID ${rows.insertId}`);
    }
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error.message);
  }
}


// הכנסת נתונים לטבלאות
async function fillTables() {
  const dataFilePath = './db.json';

  try {
    const data = await readJsonFile(dataFilePath);
    await insertDataIntoTable(`users`, data.users);
    await insertDataIntoTable(`albums`, data.albums);
    await insertDataIntoTable(`photos`, data.photos);
    await insertDataIntoTable(`posts`, data.posts);
    await insertDataIntoTable(`comments`, data.comments);
    await insertDataIntoTable(`todos`, data.todos);

    const insertPasswords = `INSERT INTO ${dbName}.passwords (userId, password)
    VALUES 
    (1, 'hildegard.org'),
    (2, 'anastasia.net'),
    (3, 'ramiro.info'),
    (4, 'kale.biz'),
    (5, 'demarco.info'),
    (6, 'ola.org'),
    (7, 'elvis.io'),
    (8, 'jacynthe.com'),
    (9, 'conrad.com'),
    (10, 'ambrose.net');
    `;
    await pool.execute(insertPasswords);
  
  } catch (error) {
    console.error('Error filling tables:', error.message);
  } finally {
    // סגירת חיבור לבסיס הנתונים
    pool.end();
  }
}

async function makeDB(){

  if(num===0){
    num = 1;
  // הפעלת הפונקציה ליצירת הטבלאות
  await createTables();
  // הפעלת הפונקציה למילוי הטבלאות
  await fillTables()}

}

// makeDB()

