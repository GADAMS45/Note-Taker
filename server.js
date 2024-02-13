const express = require("express");
const path = require("path");
const fs = require("fs")
const uniqid = require('uniqid'); 


const app = express();

// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// routes
app.get("/notes", (req, res) => {
    // res.send("hi!")
    // res.sendFile("/Users/gadams/Desktop/Homework/Note-Taker/Develop/public/notes.html")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

// app.get("/assets/css/styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"))
// })


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.post("/api/notes", (req, res) => {
 
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }
    console.log(newNote);

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err)
        }

        console.log(data)

        const notesArr = JSON.parse(data);

        console.log(notesArr)

        notesArr.push(newNote)

        console.log(notesArr)

        // overwrite the file using the updated notesArr
        fs.writeFile("./db/db.json", JSON.stringify(notesArr), () => {
            console.log("Updated db.json!")
            res.json(newNote)
        })
    })

})




app.listen(3001)