
var c = new (require('ssh2'))();

c.on('ready', function() {
	console.log('Connection :: ready');

	c.sftp(function(err, sftp) {
		if (err) throw err;

		sftp.on('end', function() {
			console.log('SFTP :: SFTP session closed');
		});

		sftp.fastGet('/download/test.java', __dirname + '/download/test.java', function(err) {
			if (err) throw err;
			console.log('download file successfully.');
			sftp.end();
		});
	});
});

c.on('error', function(err) {
	console.log('Connection :: error :: ' + err);
});

c.on('end', function() {
	console.log('Connection :: end');
});

c.on('close', function(had_error) {
	console.log('Connection :: close');
});

c.connect({
	host: 'demo.wftpserver.com',
	port: 2222,
	username: 'demo-user',
	password: 'demo-user'
});

