const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()
// const connectionstr = process.env.DATABASE_URL
const connectionstr = 'postgres://plantview-be-main-db-0d003545971c484ad:dmfKrFEdSFnPVkE2q9JTYKUEByvXfr@user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com:5432/plantview-be-main-db-0d003545971c484ad'

const db = pgp(connectionstr)

router.post('/api/devicedata', (req, res) => {
    const reqData = req.body;
    console.log(req.body)
  db.none('INSERT INTO mcdata(dev1data,dev2data) VALUES ($1,$2)',[req.body.dev1data,req.body.dev2data]).then(()=>{
    console.log('success')
    console.log('device data inserted')
    res.send({
      message: 'device data inserted'
    });
  }).catch(error=>{console.log(error);})
  console.log(db)
  
  });

module.exports = router