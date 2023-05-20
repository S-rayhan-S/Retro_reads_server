const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const initDB = require('./config/connection');
const variables = require('./config/variables');


// router
const userRouter = require('./routers/user');
const categoryRouter = require('./routers/category');
const booksRouter = require('./routers/book')
const reviewRouter = require('./routers/review')
const transactionRouter = require('./routers/transaction')



const app = express()
const port = variables.appPort;


app.use(cors())
app.use(express.json())
initDB();
app.use(cookieParser(variables.authKey));

app.use('/users', userRouter);
app.use('/books', booksRouter)
app.use('/category', categoryRouter)
app.use('/review', reviewRouter)
app.use('/transaction', transactionRouter)


app.listen(port, () => {
  console.log('RetroReads server running on  ' + port)
})
