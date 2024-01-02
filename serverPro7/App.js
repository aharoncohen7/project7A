const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());


const usersRoute = require("./routes/usersRoute");
const todosRoute = require("./routes/todosRoute");
const postsRoute = require("./routes/postsRoute");
const commentsRoute = require("./routes/commentsRoute");
const photosRoute = require("./routes/photosRoute");
const albumsRoute = require("./routes/albumsRoute");
// const loginRoute = require("./routes/loginRoute");

app.use(express.static("./client/build"))
app.use("/api/users", usersRoute);
app.use("/api/todos", todosRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/photos", photosRoute);
app.use("/api/albums", albumsRoute);
// app.use("/api/login", loginRoute);
app.use(cors());



const port = process.env.PORT || 4000;;

app.listen(port, () => {
    console.log("server is running on port " + port);
    // require("./db");
});
