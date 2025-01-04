const express = require("express");
const nunjucks = require("nunjucks")

const server = express();

server.use(express.static("public"))

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

server.get("/search", (req, res) => {
    res.render("search-results.html")
})

server.listen(3000)