const express = require('express')
const app = express()

app.get('/', (req,res) => {
  res.sendFile(__dirname+'/map.html')
})

app.listen(3000, () => {
  console.log('3000번 포트에 http server를 띄웠습니다.')
})
