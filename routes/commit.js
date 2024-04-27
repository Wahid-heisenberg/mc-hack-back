// commit.routes.js

const express = require('express');
const router = express.Router();
const {
    createCommit,
    updateCommit,
    deleteCommit,
    getAllCommits,
    getCommitById
} = require('../controllers/commit.controller');

// Route to create a new commit
router.post('/', createCommit);

// Route to update a commit by ID
router.patch('/:id', updateCommit);

// Route to delete a commit by ID
router.delete('/:id', deleteCommit);

// Route to get all commits
router.get('/', getAllCommits);

// Route to get a commit by ID
router.get('/:id', getCommitById);

module.exports = router;
