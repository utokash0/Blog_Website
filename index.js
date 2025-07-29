const path = require("path")
const express = require("express")
const app =express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

const userRouter = require("./routers/user");
const blogRouter = require("./routers/blog");

const Blog = require("./models/blog")



const { urlencoded } = require("body-parser");
const { checkForAuthentactionCookie } = require("./middleware/authentaction");

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))


app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentactionCookie("token"))
app.use(express.static(path.resolve("./public")));


mongoose.connect('mongodb://localhost:27017/blog')
.then(e =>console.log('mongoDb Connected'))



app.get("/" , async(req , res)=>{
    const allBlogs =await Blog.find({});
    res.render("home",{
        user : req.user,
        blogs : allBlogs,
    })
})

app.use("/user",userRouter)
app.use("/blog",blogRouter)


app.listen(port , ()=>{console.log(`server starts at ${port}`)})