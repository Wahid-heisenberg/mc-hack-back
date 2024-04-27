const express = require("express");
const router = express.Router();
const {
  createProject,
  assignManager,
  addGroup,
  addEmployee,
  updateProjectInfo,
  updateProjectProgress,
  getProjectsByCompany,
} = require("../controllers/project.controller");

// Route to create a new project
router.post("/projects", createProject);

// Route to assign a manager to the project
router.put("/projects/:projectId/assign-manager/:managerId", assignManager);

// Route to add a group to the project
router.put("/projects/:projectId/add-group/:groupId", addGroup);

// Route to add an employee to the project
router.put("/projects/:projectId/add-employee/:employeeId", addEmployee);

// Route to update project info
router.put("/projects/:projectId/update-info", updateProjectInfo);

// Route to update project progress
router.put("/projects/:projectId/update-progress", updateProjectProgress);

// Route to get projects by company
router.get("/projects/company/:companyId", getProjectsByCompany);

module.exports = router;
