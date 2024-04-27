const Commit = require('../models/commit.model');
const { createCommitSchema, updateCommitSchema } = require('../validators/commit.valoidators');

// Controller function to create a new commit
exports.createCommit = async (req, res) => {
    try {
        const { error } = createCommitSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const commit = await Commit.create(req.body);
        res.status(201).json(commit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a commit
exports.updateCommit = async (req, res) => {
    try {
        const { error } = updateCommitSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const commit = await Commit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!commit) {
            return res.status(404).json({ error: 'Commit not found' });
        }
        res.json(commit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a commit
exports.deleteCommit = async (req, res) => {
    try {
        const commit = await Commit.findByIdAndDelete(req.params.id);
        if (!commit) {
            return res.status(404).json({ error: 'Commit not found' });
        }
        res.json({ message: 'Commit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get all commits
exports.getAllCommits = async (req, res) => {
    try {
        const commits = await Commit.find();
        res.json(commits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a commit by ID
exports.getCommitById = async (req, res) => {
    try {
        const commit = await Commit.findById(req.params.id);
        if (!commit) {
            return res.status(404).json({ error: 'Commit not found' });
        }
        res.json(commit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
