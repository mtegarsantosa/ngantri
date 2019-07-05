const db = require('./conn')
const router = require('express').Router()

router.get('/', (req,res)=>{
  res.render('guest/index',{
    title:'Selamat Datang Peserta PPDB SMPN 1 Metro 2019!',
  })
})

 router.get('/awas', (req,res)=>{
   for (var i = 1; i <= 200; i++) {
     db.query("INSERT INTO queues VALUES('','0','"+(+i+200)+"','0')")
   }
 })

// route
router.get('/operator', (req,res)=>{
  db.query("SELECT number FROM queues WHERE operator='"+req.cookies.op_ppdb+"' ORDER BY time DESC", (err,results)=>{
    res.render('operator/index',{
      title:'Selamat Bertugas Operator!',
      queues:results
    })
  })
})

router.post('/operator', (req,res)=>{
  db.query("UPDATE queues SET operator='"+req.body.operator+"', time='"+Date.now()+"' WHERE (operator='0' OR operator='"+req.body.operator+"') AND number='"+req.body.number+"'")
})
router.post('/operator/next', (req,res)=>{
  db.query("SELECT number FROM queues WHERE operator='0' LIMIT 0,1", (err,results)=>{
    res.json({
      number:results[0].number
    })
  })
})
router.post('/operator/next/query', (req,res)=>{
  db.query("UPDATE queues SET operator='"+req.body.operator+"', time='"+Date.now()+"' WHERE number='"+req.body.number+"'")
})

// ajax
router.get('/ajax/guest/table-queue', (req,res)=>{
  db.query("SELECT number FROM queues WHERE operator = ? ORDER BY time DESC LIMIT 0,1;SELECT number FROM queues WHERE operator = ? ORDER BY time DESC LIMIT 0,1;SELECT number FROM queues WHERE operator = ? ORDER BY time DESC LIMIT 0,1;SELECT number FROM queues WHERE operator = ? ORDER BY time DESC LIMIT 0,1;SELECT number FROM queues WHERE operator = ? ORDER BY time DESC LIMIT 0,1;SELECT number FROM queues WHERE operator = ? ORDER BY time DESC LIMIT 0,1; SELECT number from queues WHERE operator = '0' limit 0,3",['1','2','3','4','5','6'], (err,results)=>{
    res.render('ajax/table-queue', {
      op:results,
      layout:false
    })
  })
})

// queues reset
router.get('/bebekkakinyadua', (req,res)=>{
    db.query("UPDATE queues SET operator='0', time='0'")
    res.send('mikir keras...')
})

module.exports = router
