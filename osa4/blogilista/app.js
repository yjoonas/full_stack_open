const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogRouter = require('./controllers/blogs')

mongoose.connect(MONGODB_URI)
    .then(() => {
    logger.info('Connected to successfully', MONGODB_URI)
    })
    .catch( () => {
        logger.error('Failed connecting to', MONGODB_URI)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})