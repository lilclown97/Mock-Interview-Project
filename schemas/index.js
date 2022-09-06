const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://test:test@mokeinterviewproject.bcaawkg.mongodb.net/test`;

const connect = () => {
  mongoose
    .connect(uri, { ignoreUndefined: true })
    .then(() => console.log('🟢DB 연결 성공'))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
