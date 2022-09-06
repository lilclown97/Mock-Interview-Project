const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Users = require('../schemas/users');
const router = express.Router();
const authMiddlewares = require('../middlewares/auth-middlewares');

// Joi
const signInSchema = Joi.object({
  id: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,15}$')).required(),
  nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,15}$')).required(),
  password: Joi.string().min(5).required(),
  confirmPassword: Joi.ref('password'),
});

// 회원가입
router.post('/users/signup', async (req, res) => {
  try {
    const { id, nickname, password } = await signInSchema.validateAsync(
      req.body
    );
    const usersIdCheck = await Users.find({
      id: id,
    });
    const nicknameCheck = await Users.find({
      nickname: nickname,
    });

    if (usersIdCheck.length) {
      res.status(401).send({
        errorMessage: '이미 가입된 아이디입니다.',
      });
      return;
    }

    if (nicknameCheck.length) {
      res.status(401).send({
        errorMessage: '이미 가입된 닉네임입니다.',
      });
    }

    if (id === password) {
      res.status(401).send({
        errorMessage: '아이디랑 비밀번호는 같을 수 없습니다.',
      });
      return;
    }
    const createUsers = await Users.create({ id, nickname, password });
    res.json({ users: createUsers });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      errorMessage: '형식이 올바르지 않습니다.',
    });
  }
});

// 로그인
router.post('/users/auth', async (req, res) => {
  const { id, password } = req.body;

  const user = await Users.findOne({ id, password });

  if (!user) {
    res.status(401).send({
      errorMessage: '닉네임 또는 비밀번호가 틀렸습니다',
    });
    return;
  }

  const token = jwt.sign({ id: user.id }, 'my-secret-key');
  res.send({ token });
});

module.exports = router;
