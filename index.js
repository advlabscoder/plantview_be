const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const pgp = require('pg-promise')()
pgp.pg.types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});
const connectionstr = process.env.DATABASE_URL
const {insert} = pgp.helpers;
const db = pgp(connectionstr)
// db.none('INSERT INTO userprofile(uid,username,password) VALUES ($1,$2,$3)',[1,"test","pass"]).then(()=>{
//   console.log('success')
// }).catch(error=>{console.log(error);})
// console.log(db)
const deviceapi = require('./routes/deviceapi')



app.use('/deviceapi', deviceapi)

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/api/read/all',async (req,res)=>{
  try{
    const deviceData = await db.any('SELECT * FROM plsendata_1001 ORDER BY prkey DESC LIMIT 300');
    console.log(deviceData);
    res.send(deviceData)
  }catch(error){
    res.send(error)
  }

})
app.post('/api/devicedata', (req, res) => {
  const reqData = req.body;
  console.log('JSON',req.body)
  const dataMulti = req.body.sens_data;;
  const query=insert(dataMulti, ['sen_id','tmstp','sen_data'], req.body.DbTableName);

db.none(query).then(()=>{
  console.log('success')
  console.log('device data inserted')
  res.send({
    message: 'device data inserted'
  });
}).catch(error=>{console.log(error);})
console.log(db)

});




// Handle production
if (process.env.NODE_ENV === 'production' || true) {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port} For External Connections Windows defender needs to be turned off`));
// const port = 3000

// app.get('/', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
// //  next();
//   res.send('Hello World!')
// })
// app.use(cors)

// app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`)
//  })

//  exports.api = functions.https.onRequest(app)