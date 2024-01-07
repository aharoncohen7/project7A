const cors = require("cors");
const {authenticate} = require('./db/monitoring');
const express = require("express");
const app = express();

const commentsRoute = require("./routes/commentsRoute");
const usersRoute = require("./routes/usersRoute");
const todosRoute = require("./routes/todosRoute");
const postsRoute = require("./routes/postsRoute");
const photosRoute = require("./routes/photosRoute");
const albumsRoute = require("./routes/albumsRoute");
const loginRoute = require("./routes/loginRoute");

app.get('/', (req, res) => {
  res.sendFile('../clientPro7/my-app/build/index.html')
})

app.use(cors());
app.use(express.json());
app.use(express.static('../clientPro7/my-app/build'))
app.use("/api/login", loginRoute);
app.use("/api/users", authenticate, usersRoute);
app.use("/api/todos", authenticate,todosRoute);
app.use("/api/posts", authenticate, postsRoute);
app.use("/api/comments",authenticate, commentsRoute);
app.use("/api/photos", authenticate,photosRoute);
app.use("/api/albums",authenticate, albumsRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("server is running on port " + port);
});
