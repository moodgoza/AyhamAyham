const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projec.controller.js')
const validateProjectFields = require('../middleware/ProjectMiddleware.js');
router.get('/projects', projectController.getAllProjects);

router.post('/projects',validateProjectFields, projectController.createProject);

router.get('/projects/:id', projectController.getProjectById);

router.get('/projects/by/:userId', projectController.getProjectByUser);

router.put('/projects/:id', projectController.updateProject);

router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;

