const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3099;

const USER_NAME = "mit-user";
const PASSWORD = "mit-password112";
const DATABASE_NAME = "mit-database";

const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.zan8h.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

mongoose
  .connect(DB_URI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database");
  });

const BlogModel = require("./Models/BlogPost");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// fetch all the blogs from the database
app.get("/blogs", (req, res) => {
  BlogModel.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: "Blogs not found" });
    });
});

// Reading a Blog by id from MongoDB
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: "Blog not found" });
    });
});

// Creating Blogs in MongoDB
app.post("/blogs", (req, res) => {
  const newBlog = new BlogModel(req.body);
  newBlog
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: "Blog can't be added" });
    });
});

// Deleting a blog by id from MongoDB
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findByIdAndDelete(id)
    .then((result) => {
      console.log("Deleted Successfully");
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ error: "Blog can't deleted" });
    });
});

// Error route
app.use((req, res) => {
  res.status(404).send("Page not found");
});
