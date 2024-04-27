const Project = require('../models/project.model');
const { createProjectSchema, updateProjectInfoSchema, updateProjectProgressSchema } = require('../validators/project.validators');

// Controller function to create a new project
exports.createProject = async (req, res) => {
  try {
    const { error } = createProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to assign a manager to the project
exports.assignManager = async (req, res) => {
  try {
    const { projectId, managerId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { manager: managerId },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to add a group to the project
exports.addGroup = async (req, res) => {
  try {
    const { projectId, groupId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { groups: groupId } },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to add an employee to the project
exports.addEmployee = async (req, res) => {
  try {
    const { projectId, employeeId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { employees: employeeId } },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update project info
exports.updateProjectInfo = async (req, res) => {
  try {
    const { error } = updateProjectInfoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { projectId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update project progress
exports.updateProjectProgress = async (req, res) => {
  try {
    const { error } = updateProjectProgressSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { projectId } = req.params;
    const { progress } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(projectId, { progress }, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get projects by company
exports.getProjectsByCompany = async (req, res) => {
    try {
      const { companyId } = req.params;
      const projects = await Project.find({ company: companyId });
      if (!projects) {
        return res.status(404).json({ error: 'No projects found' });
      }
        res.json( { succes: true ,
        projects: projects } );
       
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  