import mongoose from 'mongoose';

const  db = mongoose.createConnection('mongodb://127.0.0.1:27017/Blog',{ useNewUrlParser: true });

db.once('open' ,function() {
	console.log('连接数据库成功');
	// db.collection("menu_list"). find().toArray(function(err, result) { // 返回集合中所有数据
	// 		 if (err) throw err;
	// 		 console.log(result);
	//  });
})

db.on('error', function(error) {
    console.error(error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect('mongodb://127.0.0.1:27017/Blog', {server:{auto_reconnect:true}});
});



export default db;
