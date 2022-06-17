const express = require("express")
const {mongoose} = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express()
app.use(fileUpload());

const FileRouter = require("./file/router/file.controller")
const bodyParser = require("express");
const PORT = process.env.PORT || 5000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/file", FileRouter)
app.use(
    bodyParser.urlencoded({
        extended: true,
    }))
const url = "mongodb+srv://aibek:1234@cluster0.dxndcbh.mongodb.net/file_writer?retryWrites=true&w=majority";
async function start ( ){
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
        }, (err) => {
            if (err) {
                console.log("jopa", err.message);
            }
            else {
                console.log("Connected to MongoDB");
                app.listen(PORT, () => {
                    console.log(`Server is running on port ${PORT}`);
                })
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}
start()

