const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../db/knex');
const { authenticate } = require('./auth');
const app = express();
const cors = require('cors');

const router = express.Router();
app.use(express.json());
app.use(cors());

router.get('/notes', authenticate, async (req, res) => {
  try {
    const notes = await knex('notes').where({ user_id: req.user.userId });
    if (notes.length === 0) {
      return res.status(200).json([]); // Return an empty array when no notes are found
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.post('/notes', authenticate, async (req, res) => {
  const { title,content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const [noteId] = await knex('notes').insert({
      user_id: req.user.userId,
      title,
      content,
    });

    const newNote = await knex('notes').where({ id: noteId }).first();
    res.status(201).json(newNote);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.put('/notes/:id', authenticate, async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const note = await knex('notes').where({ id: noteId, user_id: req.user.userId }).first();
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await knex('notes').where({ id: noteId }).update({ title, content });
    const updatedNote = await knex('notes').where({ id: noteId }).first();
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.delete('/notes/:id', authenticate, async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await knex('notes').where({ id: noteId, user_id: req.user.userId }).first();
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await knex('notes').where({ id: noteId }).del();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
