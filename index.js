import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const D = new Date();
const year = D.getFullYear();

let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.year = year;


// Index Page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Post Page
app.get("/post", (req, res) => {
    res.render("post.ejs", {blogs});
})

// Add New Blog Feature
app.post("/data", (req, res) => {
    let personName = req.body.name;
    let blogTitle = req.body.title;
    let blogContent = req.body.content;

    // console.log(name);
    // console.log(title);
    // console.log(content);
    const newBlog = {
        name: personName,
        title: blogTitle,
        content: blogContent
    };

    blogs.push(newBlog);

    res.render("post.ejs", {blogs});
});

// Editing Blog Feature
    // Get the old Data
app.get("/edit/:id", (req, res) =>{
    console.log(req.params.id);
    const blogIndx = req.params.id;
    const blogToEdit = blogs[blogIndx];

    res.render("index.ejs", {
        blogs,
        editMode: true,
        editBlog: { ...blogToEdit, id: blogIndx}
    });
});

    // Update the new data
app.post("/edit/:id", (req, res) => {
    const index = req.params.id;

    blogs[index] = {
        name : req.body.name,
        title : req.body.title,
        content: req.body.content
    }

    res.render("post.ejs", {blogs});
});

// Delete Blog Feature
app.post("/delete/:id", (req, res) => {
    const indx = req.params.id;

    blogs.splice(indx, 1);

    res.render("post.ejs", {blogs});
});

app.listen(port, () => {
    console.log(`server running on port ${port}.`);
});