const express = require('express')
const cors = require('cors')

const app = express()



app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/api/read/all',async (req,res)=>{
  try{
   
    res.send('hello ')
  }catch(error){
    res.send(error)
  }

})




// Handle production
if (process.env.NODE_ENV === 'production' || true) {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
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