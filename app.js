var express = require("express")
  , url = require("url")
  , moment = require("moment")
  , app = express()
  , port = "3000"

app.use('/', express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + "public/index.html")
})

app.get('/*', function(req, res) {
  var args = url.parse(req.url, true)
    , date = moment(new Date(decodeURIComponent(args.pathname)).toISOString())
  
  res.end(date.format())
})

app.listen(port, function() {
  console.log("Listening at port " + port + "...")
})