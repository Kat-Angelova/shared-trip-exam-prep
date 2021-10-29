const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { authMiddleware } = require('../middlewares/authMiddleware.js');

module.exports = function expressConfig(app){
    app.use('/static', express.static(path.resolve(__dirname, '../static')));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware);
};