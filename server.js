const express = require('express')
const axios = require('axios')
const cors = require('cors');
var bodyParser = require('body-parser')

const app = express()
const port = 3001
const mainUrl = 'http://10.0.1.108/api/v1'

app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());

app.get('/api/*', async (req, res) => {
  try{
    const response = await axios.get(`${mainUrl}/${req.params['0']}`, {
        params: req.query,
        headers: {
          "Authorization": req.headers['authorization'] || '',
        }
    }).then(response=> ({data: response.data, status: response.status})).catch(err=>({
      data: err.response.data, status: err.response.status
    }))
    res.status(response.status).json(response.data)
  } catch(error){
    res.status(500).json({error})
  }
})

app.post('/api/*', async (req, res) => {
  try{
    const response = await axios.post(`${mainUrl}/${req.params['0']}`, req.body, {
        headers: {
          "Content-type": 'application/json',
          "Authorization": req.headers['authorization'] || '',
        }
    }).then(response=> ({data: response.data, status: response.status})).catch(err=>({
      data: err.response.data, status: err.response.status
    }))
    res.status(response.status).json(response.data)
  } catch(error){
    res.status(500).json({error})
  }
})


app.put('/api/*', async (req, res) => {
  try{
    const response = await axios.put(`${mainUrl}/${req.params['0']}`, req.body, {
        headers: {
          "Content-type": req.headers['content-type'],
          "Authorization": req.headers['authorization'] || '',
        }
    }).then(response=> ({ data: response.data, status: response.status})).catch(err=>({
      data: err.response.data, status: err.response.status
    }))
    res.status(response.status).json(response.data)
  } catch(error){
    res.status(500).json({error})
  }
})

app.delete('/api/*', async (req, res) => {
  try{
    const response = await axios.delete(`${mainUrl}/${req.params['0']}`, {
        headers: {
          "Content-type": req.headers['content-type'],
          "Authorization": req.headers['authorization'] || '',
        }
    }).then(response=> ({ data: response.data, status: response.status})).catch(err=>({
      data: err.response.data, status: err.response.status
    }))
    res.status(response.status).json(response.data)
  } catch(error){
    res.status(500).json({error})
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

