const express = require("express");
const db = require("./config/db");
const Post = require("./models/Post");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());


db()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));


app.get("/api/", (req, res) => {
    res.status(200).json({message:'Api is working fine :)'})
})

// Fetching all the posts
app.get("/api/posts", (req, res) => {
    Post.find({}).then((data) => {
        res.status(200).json({data});
    }).catch((err) => {
        res.status(500).json({message: err});
    })
})

// Get a specific post
app.get("/api/posts/:id", (req, res) => {
    let postId = req.params.id
    Post.find({_id: postId}).then((data) => {
        res.status(200).json({data});
    }).catch((err) => {
        res.status(500).json({message: err});
    })
})

// Create a new post
app.post("/api/posts/", (req, res) => {
    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save().then((data) => {
        res.status(200).json({message: "Post created successfully",data:data})
    }).catch((err) => {
        res.status(500).json({message: err})
    })
})

// Updating a specific post
app.put("/api/posts/:id", (req, res) => {
    
    let postId = req.params.id

    let newInfo = {
        title: req.body.title,
        description: req.body.description
    }

    Post.findByIdAndUpdate(postId,newInfo).then((data) => {
        res.status(200).json({message: "Post updated successfully",data:data})
    }).catch((err) => {
        res.status(500).json({message: err})
    })

})

// Deleting a specific post
app.delete("/api/posts/:id", (req, res) => {
    
    let postId = req.params.id

    Post.findByIdAndDelete(postId).then((data) => {
        res.status(200).json({message: "Post deleted successfully",data:data})
    }).catch((err) => {
        res.status(500).json({message: err})
    })
})

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is up :) on port ${port}`);
  }
});
