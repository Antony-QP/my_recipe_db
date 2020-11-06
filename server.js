const express = require ('express')

const app = express()

// Init middleware
// app.use(express.json({ extended : false }))

app.get('/', (req, res) => res.json({ msg : "Welcome to My Recipe DB"}))

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/recipes', require('./routes/recipes'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))