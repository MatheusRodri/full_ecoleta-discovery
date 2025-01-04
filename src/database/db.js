// Initialize database
const sqlite3 = require('sqlite3').verbose();

// Create database object
const db = new sqlite3.Database("./src/database/database.db");
module.exports = db;

// Serialize the database
db.serialize(() => {
    //Create table
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Insert data
    
    const query = `
        INSERT INTO places(image,name, address, address2, state, city, items) VALUES(?,?,?,?,?,?,?);
    `
    const values = [
        "https://www.google.com/imgres?q=foto&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fti%2Ffotos-gratis%2Ft1%2F11215319-planeta-terra-com-nascer-do-sol-no-espaco-foto.jpg&imgrefurl=https%3A%2F%2Fpt.vecteezy.com%2Ffotos-gratis%2Fespa%25C3%25A7o&docid=exdAoboZ8wxzoM&tbnid=vbPmnnvh-63aYM&vet=12ahUKEwiFtpq5-9yKAxUzBrkGHQZFAAQQM3oECBUQAA..i&w=711&h=400&hcb=2&ved=2ahUKEwiFtpq5-9yKAxUzBrkGHQZFAAQQM3oECBUQAA",
        "Papersider2",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(error){
        if (error) {
            return console.log(error)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)

    //Select data

    const querySelect = "SELECT * FROM places";

    function afterSelectData(error, rows) {
        if (error) {
            return console.log(error)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)
    }

    // db.all(querySelect, afterSelectData)

    // //Delete data

    const queryDelete = "DELETE FROM places WHERE id = ?";

    function afterDeleteData(error) {
        if (error) {
            return console.log(error)
        }

        console.log("Registro deletado com sucesso")
    }
    

    // db.run(queryDelete, [],   afterDeleteData)

})
