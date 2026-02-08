import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//making static folder using a middleware
app.use(express.static("public"));

//give us the text format instead of the gibberish letter
app.use(bodyParser.urlencoded({extended: true}));

//an array working as a database as we don't have a database yet
let blogEntries = [
    {
        title: "Welcome to My Website",
        content: "This is a default post. Click on the button to create a new Blog Post."
    }
];

//Home page: This is the base home page
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: blogEntries});
});

//Compose page: Shows the form to create a new post
app,get("/compose", (req, res) => {
    res.render(compose.ejs)
});

//Compose Page: takes info from the client: Create Post
app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle, //Grabs input from the form itself 
        body: req.body.postbody
    };
    blogEntries.push(post);//When input done then it have to store in the array to use it in future
    res.redirect("/");//Sends the user back to the home page
});

//Read Post: Shows a single post in full details
app.get("/post/:id", (req, res) => {
    const index = req.params.id;//Grabs the number from the URL (eg: post/0 then index = 0)
    const requestedPost = blogEntries[index];//Finds the post in the array

    //Renders the 'Post.ejs' file with that specific post's data
    res.render("post.ejs", {
        post: requestedPost,
        index: index
    });
});

//Edit Post: Shows the pre-filled with old data
app.get("/edit/:id", (req, res) => {
    const index = req.params.id;
    const requestedPost = blogEntries[index];
    
    //Renders the 'edit.ejs' file with that specifc post 
    res.render("edit.ejs", {
        post:requestedPost,
        index: index
    });
});

//Update Post: Handles the changes from the edit form
app.post("/update", (req, res) => {
    const index = req.body.index;

    blogEntries[index] = {
        title: req.body.postTitle,
        content: req.body.postBody
    };

    //back to home
    res.redirect("/");
});

//listening constanty
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})