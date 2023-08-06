//Create web server
const express = require('express');
const router = express.Router();
const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Create a comment
router.post('/create', (req, res) => {
    const { content, userId, postId } = req.body;
    // console.log(req.body);
    Comment.create({
        content: content,
        userId: userId,
        postId: postId
    })
        .then(comment => {
            // console.log(comment);
            res.json(comment);
        })
        .catch(err => {
            res.json(err);
        })
});

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
    })
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.json(err);
        })
});

// Get comment by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Comment.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
    })
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.json(err);
        })
});

// Get comment by post id
router.get('/post/:id', (req, res) => {
    const { id } = req.params;
    Comment.findAll({
        where: {
            postId: id
        },
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
    })
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.json(err);
        })
});

// Get comment by user id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    Comment.findAll({
        where: {
            userId: id
        },
        include: [
            {
                model: