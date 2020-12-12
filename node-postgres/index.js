const express = require('express')
const app = express()
const port = 3001

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// })

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

const mod7_model = require('./mod7_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS'); //got rid of delete after put
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  mod7_model.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/users', (req, res) => {
  mod7_model.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// app.delete('/merchants/:id', (req, res) => {
//   mod7_model.deleteMerchant(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

