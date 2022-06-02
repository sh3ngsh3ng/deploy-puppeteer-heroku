const express = require("express");


let app = express();


async function main() {
  app.get("/", (req,res)=> {
    res.status(200)
    res.send("Server is up and running")
  })

  
}


main();

app.listen(3000, () => {
  console.log("Server has started");
});