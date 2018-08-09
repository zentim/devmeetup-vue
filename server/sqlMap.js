var sqlMap = {
  user: {
    add: 'insert into user(email, password) values (?, ?)',
    all: 'SELECT * FROM user',
    query: 'SELECT * FROM user WHERE `email` = ? AND `password` = ?'
  },
  meetup: {
    add: 'INSERT INTO meetup(title, description, imageUrl, location, date, creatorId) values (?, ?, ?, ?, ?, ?)',
    all: 'SELECT * FROM meetup',
    query: 'SELECT * FROM user WHERE `meetupId` = ?',
    update: 'UPDATE `meetup` SET `title`=?, `description`=?, `imageUrl`=?, `location`=?, `date`=?, `creatorId`=? WHERE  `meetupId`=?'
  },
  registeration: {
    add: 'INSERT INTO registeration(meetupId, userId) VALUES (?, ?)',
    all: 'SELECT * FROM registeration',
    query: 'SELECT * FROM registeration WHERE `meetupId` = ? AND `userId` = ?',
    meetup: 'SELECT * FROM registeration WHERE `meetupId` = ?',
    user: 'SELECT * FROM registeration WHERE `userId` = ?',
    delete: 'DELETE FROM registeration WHERE `meetupId` = ? AND `userId` = ?'
  }
}
module.exports = sqlMap;
