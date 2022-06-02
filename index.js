const express = require("express");


let app = express();


async function main() {
  app.get("/", (req,res)=> {
    res.status(200)
    res.send("Server is up and running")
  })

  
}


main();

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});