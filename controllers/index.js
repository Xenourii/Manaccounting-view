module.exports.controller = function(app){
  app.get('/', function(req, res) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      http.get("http://localhost:3000/")
      res.end('Welcome home');
  });
}
