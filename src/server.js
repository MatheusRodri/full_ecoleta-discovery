// Dependencies
const express = require("express");
const nunjucks = require("nunjucks");

// Database
const db = require("./database/db");

const server = express();
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

// 
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//pagina inicial
server.get("/", (req, res) => {
    res.render("index.html")
})

server.get("/create-point", (req, res) => {
    res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
    
    //Insert data
    const query = `
        INSERT INTO places(image,name, address, address2, state, city, items) VALUES(?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(error) {
        if (error) {
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", {
            saved:true
        })
    }

    db.run(query, values, afterInsertData)

    
    
})


server.get("/search", (req, res) => {

    const search = req.query.search;

    if (search == "") {
        //Empty search
        return res.render("search-results.html", { total: 0 })
    }

    //Select data
    const querySelect = `SELECT * FROM places WHERE city LIKE '%${search}%'`;

        function afterSelectData(error, rows) {
            if (error) {
                return console.log(error)
            }

            console.log("Aqui estão seus registros")
            console.log(rows)
            
            const total = rows.length

            // Return the search results to page
            res.render("search-results.html", { places: rows,total })
        }

        db.all(querySelect, afterSelectData)
    
})

server.listen(3000)