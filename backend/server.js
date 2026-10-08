require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

app.post('/enviar', async (req, res) => {
  const { nome, email, mensagem } = req.body

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Preencha todos os campos.' })
  }

  try {
    await transporter.sendMail({
      from: `"Portfólio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // chega no seu próprio email
      replyTo: email,             // ao clicar em "Responder", vai para quem escreveu
      subject: `Nova mensagem de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Falha ao enviar o email.' })
  }
})

app.listen(3001, () => console.log('Backend rodando em http://localhost:3001'))