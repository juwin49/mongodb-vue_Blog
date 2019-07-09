import express from 'express';
import fs  from 'fs'; //引入fs模块
import db from './db/db.js';


const app = express();

// server.use(express.static(__dirname));
app.use(express.static('./public'));

//允许跨域访问
app.all('*',function (req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/hello', function (req, res) {
     res.send('Hello World');
});

app.get('/db/getMenu', function (req, res) {
  db.collection("menu_list"). find().toArray(function(err, result) { // 返回集合中所有数据
       if (err) throw err;
       res.send(result);
   });
});
// app.get('/db/search/:searchid', function (req, res) {
// 	let searchid = req.params.searchid.toString();
// 	let textFind="node学习.txt";
//   db.collection("text_list"). find({"name":textFind}).toArray(function(err, result) { // 返回集合中所有数据
//        if (err) throw err;
//        res.send(result);
//    });
// });
app.get('/db/getTaxtList/:menuid', function (req, res) {
	let menuid = req.params.menuid.toString();
	let page = parseInt(req.query.page);
	let size = parseInt(req.query.size);
	let textFind=menuid;
	if(menuid=="000000"){
		textFind = {$ne:null};
		db.collection("text_list"). find({"menuid":textFind}).sort({"time":-1}).limit(size).skip(page*size).toArray(function(err, result) { // 返回集合中所有数据
				 if (err) throw err;
				 res.send(result);
		 });
	}else if(menuid.slice(-4)=="0000"){
		textFind=new RegExp(menuid.slice(0,2)+'\\'+'d{4}');//node通过mongoose模糊查询mongodb,直接硬编码可以，通过构造字符串不行，需通过使用RegExp，来构建正则表达式对象，可以
		db.collection("text_list"). find({"menuid":textFind}).sort({"time":-1}).limit(size).skip(page*size).toArray(function(err, result) { // 返回集合中所有数据
				 if (err) throw err;
				 res.send(result);
		 });
	}else if (menuid.slice(-2)=="00") {
		db.collection("text_list"). find({"menuid":textFind}).sort({"time":-1}).limit(size).skip(page*size).toArray(function(err, result) { // 返回集合中所有数据
				 if (err) throw err;
				 res.send(result);
		 });
	}else{
		textFind=new RegExp(textFind);
		db.collection("text_list"). find({"name":textFind}).sort({"time":-1}).toArray(function(err, result) { // 返回集合中所有数据
	       if (err) throw err;
	       res.send(result);
	   });
	}

});
app.get('/db/textDetail/:textid/:textname', function (req, res) {
	  let textid = req.params.textid.toString();
		let textname = req.params.textname.toString();
	//	let realPath = './db/text/'+textid+'/'+textname;
	  let realPath = './db/text/'+textname;
		fs.readFile(realPath,function(err,data){
        /*
        realPath为文件路径
        第二个参数为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容*/
        if(err){
            //未找到文件
            res.writeHead(404,{
                'content-type':'text/plain'
            });
            res.write('404,页面不在');
            res.end();
        }else{
            //成功读取文件
            res.writeHead(200,{
                'content-type':'text/html;charset=utf-8'
            });
						//let studentRuselt=encodeURIComponent(JSON.stringify(data),"utf-8");
            res.write(data);
						//console.log(data);
            res.end();
        }
    })

	//	res.send(textname);
});
app.listen(8585, function () {
  // var host = server.address().address
  // var port = server.address().port
  // console.log("应用实例，访问地址为 http://%s:%s", host, port)
  console.log('Server running at http://127.0.0.1:8585/');

});
