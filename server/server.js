const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./db/mongoose');
const userRouter = require('./routers/userRouter');
const customerRouter = require('./routers/customerRouter');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/customers', customerRouter);

app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
