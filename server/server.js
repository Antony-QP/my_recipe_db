const express = require ('express')
const { connect } = require('mongoose')
const connectDB = require('./config/db')

const app = express()

// Init middleware
app.use(express.json({ extended : false , limit : '50mb'}))
app.use(express.urlencoded({ limit : '50mb', extended: "true"}))

// Connect database
connectDB();

app.get('/', (req, res) => res.json({ msg : "Welcome to My Recipe DB"}))

// Define Routes
app.use('/api/upload', require('./routes/upload'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/recipes', require('./routes/recipes'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))