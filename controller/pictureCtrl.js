//var pictures = require('./pictures.json');

module.exports = {
  get: function(req, res, next){

    var page = (req.query.page || 1) / 1;
    var pageSize = (req.query.pageSize || 20) / 1;
    var startIndex = (page - 1) * pageSize;

    var first20Pictures = pictures.slice(startIndex, startIndex + pageSize);
    res.send(first20Pictures);
  }
}
