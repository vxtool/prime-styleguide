var http 	= require('http');
var path 	= require('path');
var fs 		= require('fs');

extensions = {
	".html" : "text/html",
	".css" 	: "text/css",
	".js" 	: "application/javascript",
	".json" : "application/json",
	".png" 	: "image/png",
	".gif" 	: "image/gif",
	".jpg" 	: "image/jpeg"
};

function getFile(filePath, res, page404, mimeType){
	fs.exists(filePath,function(exists){
		if(exists){
			fs.readFile(filePath,function(err,contents){
				if(!err){
					res.writeHead(200,{
						"Content-type" : mimeType,
						"Content-Length" : contents.length
					});
					res.end(contents);
				} else { console.dir(err); };
			});
		} else {
			fs.readFile(page404,function(err,contents){
				if(!err){
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end(contents);
				} else { console.dir(err); };
			});
		};
	});
};

function requestHandler(req, res) {
	var fileName 	= path.basename(req.url) || 'index.html';
	var ext 		= path.extname(fileName);
	var localFolder = './';
	var page404 	= localFolder + '404.html';
	var libs 		= [
		'react.js',
		'react-dom.js',
		'react-with-addons.js',
		'browser.min.js',
		'jquery.min.js'
	]

	if(!extensions[ext]){
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
	};

	switch(extensions[ext]) {
    case 'application/json':
      localFolder = localFolder + 'modules/';
      break;
		case 'text/css':
			localFolder = localFolder + 'assets/css/';
			break;
		case 'application/javascript':
			if(libs.indexOf(fileName) !== -1){ localFolder = localFolder + 'assets/js/lib/'; }
			else { localFolder = localFolder + 'assets/js/app/'; }
			break;
	}

	getFile((localFolder + fileName), res, page404, extensions[ext]);
};

http.createServer(requestHandler).listen(4000);
console.log('http://localhost:4000');
