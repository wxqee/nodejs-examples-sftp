
/**************************************************
opts:
	|-- name
	|-- host
	|-- port
	|-- username
	|-- password
	|-- remoteFile
	`-- localFile
**************************************************/

exports.downloadFile = function(opts){
   
   console.log("run Job :" + opts.name);

	var SSH2 = require('ssh2');

	var c = new SSH2();

	c.on('ready', function() {
		console.log('Connection :: ready');

		c.sftp(function(err, sftp) {
			if (err) throw err;

			sftp.on('end', function() {
				console.log('SFTP :: SFTP session closed');
			});

			sftp.fastGet(opts.remoteFile, opts.localFile, {
				step: function(intTotalTransferred, chunk, total) {
					console.log((( intTotalTransferred * 100 ) / total ) + '% has been transferred.')
				}
			}, function(err) {
				if (err) throw err;
				console.log('download file successfully.');
				c.end();
			});
		});
	});

	c.on('banner', function(message, language) {
		console.log('Connection :: banner');
		console.log('Welcome message in ' + language + ': [' + message + ']');
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
		host: opts.host,
		port: opts.port,
		username: opts.username,
		password: opts.password
	});
}

