const db = require('../models')
const Project = db.projects
const User = db.users
// GET /projects
async function getAllProjects(req, res) {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
async function getProjectByUser(req, res) {
    const userId = req.params.userId;

    try {
        const projects = await Project.findAll({
            where: {
                userId: userId,
            }
        });

        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
async function createProject(req, res) {
    const { title, content,userId ,clientName, thumbNail, projectImages, image360 } = req.body;


    try {
        const project = await Project.create({ title, content,userId, clientName, thumbNail, projectImages, image360 });
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getProjectById(req, res) {
    const projectId = req.params.id;

    try {
        const project = await Project.findByPk(projectId, {
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName']
            }
        }
        );
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// PUT /projects/:id
async function updateProject(req, res) {
    const projectId = req.params.id;
    const { title, content, clientName, thumbNail, projectImages } = req.body;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        project.title = title;
        project.content = content;
        project.clientName = clientName;
        project.thumbNail = thumbNail;
        project.projectImages = projectImages;
        await project.save();
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// DELETE /projects/:id
async function deleteProject(req, res) {
    const projectId = req.params.id;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectByUser
};