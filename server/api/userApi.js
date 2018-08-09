var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失敗'
    });
  } else {
    res.json(ret);
  }
}

// user
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.email, params.password], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.get('/allUsers', (req, res) => {
  var sql = $sql.user.all;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/getUser', (req, res) => {
  var sql = $sql.user.query;
  var params = req.body;
  conn.query(sql, [params.email, params.password], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

// meetup
router.post('/addMeetup', (req, res) => {
  var sql = $sql.meetup.add;
  var params = req.body;
  var condition = [
    params.title,
    params.description,
    params.imageUrl,
    params.location,
    params.date,
    params.creatorId
  ]
  console.log(condition);
  conn.query(sql, condition, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.get('/allMeetups', (req, res) => {
  var sql = $sql.meetup.all;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/getMeetup', (req, res) => {
  var sql = $sql.meetup.query;
  var params = req.body;
  conn.query(sql, [params.meetupId], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/updateMeetup', (req, res) => {
  var sql = $sql.meetup.update;
  var params = req.body;
  var condition = [
    params.title,
    params.description,
    params.imageUrl,
    params.location,
    params.date,
    params.creatorId,
    params.meetupId
  ]
  conn.query(sql, condition, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

// registeration
router.post('/addRegisteration', (req, res) => {
  var sql = $sql.registeration.add;
  var params = req.body;
  var condition = [
    params.meetupId,
    params.userId
  ]
  console.log(condition);
  conn.query(sql, condition, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.get('/allRegisterations', (req, res) => {
  var sql = $sql.registeration.all;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/getRegisteration', (req, res) => {
  var sql = $sql.registeration.query;
  var params = req.body;
  conn.query(sql, [params.meetupId, params.userId], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/getRegisterationForMeetup', (req, res) => {
  var sql = $sql.registeration.meetup;
  var params = req.body;
  conn.query(sql, [params.meetupId], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/getRegisterationForUser', (req, res) => {
  var sql = $sql.registeration.user;
  var params = req.body;
  conn.query(sql, [params.userId], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

router.post('/deleteRegisteration', (req, res) => {
  var sql = $sql.registeration.delete;
  var params = req.body;
  conn.query(sql, [params.meetupId, params.userId], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      jsonWrite(res, result);
    }
  })
})

module.exports = router;
