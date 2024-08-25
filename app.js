const express = require("express");
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// fetch all the blogs from the database
app.get("/blogs", (req, res) => {
  BlogModel.find()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Reading a Blog by id from MongoDB
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findById(id)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Creating Blogs in MongoDB
app.post("/blogs", (req, res) => {
  const newBlog = new BlogModel(req.body);
  newBlog
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Deleting a blog by id from MongoDB
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findByIdAndDelete(id)
    .then((result) => {
      console.log("Deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
