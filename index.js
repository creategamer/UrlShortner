const express = require('express')
const path = require('path')
const urlRoute = require('./routes/url.js')
const { connnectMongoDB } = require('./connect.js')
const cookieParser = require('cookie-parser')

const URL = require('./models/url.js')
const staticRoute = require('./routes/staticRouter.js')
const userRoute = require('./routes/user.js')
const { checkForAuthentication, restrictTo } = require('./middlewares/auth.js')

const app = express()
const PORT = 8001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'))

connnectMongoDB(process.env.MONGODB ?? 'mongodb://127.0.0.1:27017/shortUrl')
    .then(() => console.log('mongodb connected'))

app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL)
})



app.listen(PORT, () => console.log(`server connected on the port of ${PORT}`))