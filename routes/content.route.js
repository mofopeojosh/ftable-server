const express = require('express');
const router = express.Router();

const content_controller = require('../controllers/content.controller');

router.get('/', content_controller.getAllContents);
router.get('/:id', content_controller.getContent);
router.post('/create', content_controller.createContent);
router.put('/:id/edit', content_controller.updateContent);
router.put('/:id/delete', content_controller.deleteContent);

module.exports = router;
