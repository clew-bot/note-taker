//libraries //
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

module.exports = app => {
        //find database file and retrieve any information if there is any. if no database is found a database will be created // 
       fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let noteInformation = JSON.parse(data);

            // notes route api//
            app.get("/api/notes", (req, res) => {
                res.json(noteInformation);
            });

            // posted notes will generate a unique id from the uuid library. //
            app.post("/api/notes", (req, res) => {
                let generatedNote = req.body;
                // built in function provided by uuid library // 
                generatedNote.id = uuidv4();
                noteInformation.push(generatedNote);
                // run function that will update our database //
                runDataBase();
                //api response for the generated note //
                res.json(generatedNote);
            });
            app.get("/api/notes/:id", (req, res) => {
                res.json(noteInformation[req.params.id]);
            });
            // this will delete the note upon request //
            app.delete("/api/notes/:id", (req, res) => {
                let deleteThisNote = req.params.id;
            //filter out notes that don't equal to the note id //
                noteInformation = noteInformation.filter((note) => {
                return note.id != deleteThisNote;
            });
            // run function to update database //
                runDataBase();
            //success // 
                console.log("Successfully deleted note: " + req.params.id);
                res.json(true);
        });

    
        // ======== html routes ============= //
        
        // /notes route will bring to the notes.html where user can write and save notes // 
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // * route will bring user to the index.html - homepage //
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
      
       // function that runs to update database according to posting or deleting //
        function runDataBase() {
            fs.writeFile("db/db.json", JSON.stringify(noteInformation, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}
// uuid library used to generate a unique id for every given note //
//to install open integrated terminal and run "npm install uuid" //
