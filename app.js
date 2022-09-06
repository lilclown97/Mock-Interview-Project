// require
const express = require('express');
const cors = require('cors');
const connect = require('./schemas');

const app = express();
const port = 5000;

connect();

// router
const usersRouter = require('./routes/users');

// use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.use('/api', [usersRouter]);

// 404 error
app.use((req, res, next) => {
  res.status(404).json({ message: '요청하신 페이지를 찾을 수 없습니다' });
});

// error handller
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log('🟢', port, '번 포트');
});
