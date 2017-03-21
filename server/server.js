const path = require('path');  //this is a build in node module.  doesn't need installing

const publicPath = path.join(__dirname, '/../public');
const express = require('express')
const port = process.env.PORT || 3000;
var app = express();


app.use(express.static(publicPath));



app.listen(port, () =>{
  console.log(`Listening on port: ${3000}`);
});
/////abiove. simple node servder serving up the static html file in /public
