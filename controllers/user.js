const http = require("http");

module.exports.controller = function(app){

app.get('/userlist', function(req, res){
  var excel = ReadDatabaseCSV();
  var users = JSON.stringify(excel); ///HERE!!
  res.render('userList.ejs', {users: users});
})

app.get('/login', function(req, res){
    res.render('loginUser.ejs');
});

app.post('/login', function(req, res){
    const urlToLogin = "http://localhost:3000/api/user/login";
    http.get(urlToLogin, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
            console.log(body);
          body = JSON.parse(body);
        });
      });
});

  app.get('/register', function(req, res) {
      res.render('registerUser.ejs');
  });

  app.post('/add', function(req, res) {
    console.log(req.body);

    var array = Object.keys(req.body).map(champ => champ);
    try {
        var excel = ReadDatabaseCSV();
        console.log(excel);
        excel.push(req.body);

        WriteToDatabaseCSV(excel, array);
        console.log("ok")
    }
    catch (err){
        res.status(500).send(err);
    }
      res.render('userCreated.ejs');
  });

  function ReadDatabaseCSV(){
    var excel;
    try {
        excel = fs.readFileSync(dbFilePath, {encoding: "utf8"});
        excel = csv2json.toSchemaObject(excel, {delimiter: ";"});
    }
    catch (err){
        excel = [];
    }
      return excel;
  }

  function WriteToDatabaseCSV(excel, array){

      var result = json2csv({data: excel, fields: array, del: ";", quotes: ''});

      fs.writeFile(dbFilePath, result, function(err) {
          if (err) res.status(500).send(err);
      });
  }

  // app.get('/:etagenum/chambre', function(req, res) {
  //     res.render('index.ejs', {etage: req.params.etagenum});
  // });
}
