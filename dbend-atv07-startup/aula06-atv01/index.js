const express = require("express");
const app = express();
const produtoRota = require("./rotas/produtos")

app.use(express.json());

app.use("/produto", produtoRota)

app.get("/", (req, res) => {
  res.json({ msg: "Hello from Express!" });
});

app.listen(8080, () => {
  console.log("Servidor pronto na porta 8080");
});