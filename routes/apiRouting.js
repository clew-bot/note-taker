const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

module.exports = app => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if(err) throw err;
        let noteInformation = JSON.parse(data);

        //notes route api//
        app.get("./api/notes", function (res,req) {
            res.json(noteInformation)
        });
        

        app.post("/api/notes", function (req,res) {
            let generatedNote = req.body;
            noteInformation.push(generatedNote);
            runDataBase();
            res.json(generatedNote);
        });
        app.get("api/notes/:id", function (req, res) {
            res.json(noteInformation[req.params.id]);
        });
        app.delete("/api/notes/:id", function (req, res) {
            let deleteThisNote = req.params.id;
            generatedNote = generatedNote.filter((note) => {return note.id != deleteThisNote})
            runDataBase();
            res.json(true);
        });
        


        //Viewing routes //
        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        function runDataBase() {
            fs.writeFile("./db/db.JSON", JSON.stringify((noteInformation), "\t"), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
