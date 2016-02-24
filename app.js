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
    , date = args.pathname.replace('/', '')
    , unix
    , natural
    
  try {
    
    if (date.replace(/\d+/, '') !== '') {
      date = moment(new Date(decodeURIComponent(date)).toISOString())
    }
    else {
      date = moment.unix(+date)
    }
    
    unix = date.unix()
    natural = date.format("MMMM DD, YYYY")
    
  } catch(err) {
    
    console.log("Time not in correct format")
    
    unix = null
    natural = null
    
  } finally {
    
    var result = {
      unix: unix,
      natural: natural
    }    
    
  }
  
  res.json(result)
})

app.listen(port, function() {
  console.log("Listening at port " + port + "...")
})