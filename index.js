var cronjobs = require('./lib/cronjobs');
// -----------------------------------------------------------------

var schedule = require('pomelo-schedule');

var data = {
	name: "schedule>>> sftp downloading DATA file",
	remoteFile: '/home/xiwang/setup/mysql-5.5.17.tar.gz',
	localFile: __dirname + '/mysql-5.5.17.tar.gz',
	host: 'localhost',
	port: 22,
	username: 'xiwang',
	password: 'mypassword'
};

/*
-------------------------------
1     2     3     4   5    6
-------------------------------
|     |     |     |   |    |
|     |     |     |   |    +----- day of week (0 - 6) (Sunday=0)
|     |     |     |   +------- month (1 - 12)
|     |     |     +--------- day of month (1 - 31)
|     |     +----------- hour (0 - 23)
|     +------------- min (0 - 59)
+------------- second (0 - 59)
*/
schedule.scheduleJob("0 0 9 * * 1", cronjobs.downloadFile, data);
// schedule.scheduleJob("0/10 * * * * *", cronjobs.downloadFile, data);

