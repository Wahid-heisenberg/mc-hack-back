const Group = require("../models/group.model");

// Controller to create a new group
exports.create_group = async (req, res) => {
  try {
    const { name,  company, color, manager } = req.body;
    const group = await Group.create({ name,  company, color, manager });
    res.status(201).json({ success: true, data: group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller to get all groups
exports.get_by_company = async (req, res) => {
  try {
    const company = req.params.company;
    const groups = await Group.find({ company });
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller to get a single group by ID
exports.get_group_by_id = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }
    res.status(200).json({ success: true, data: group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.get_group_by_manager = async (req, res) => {
    try {
        const manager = req.params.manager;
        const group = await Group.find({ manager });
        if (!group) {
            return res.status(404).json({ success: false, error: "Group not found" });
        }
        res.status(200).json({ success: true, data: group });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};



// Controller to update a group by ID
exports.update_group_by_id = async (req, res) => {
  try {
    const groupId = req.params.id;
    const { name, description, company, color, manager, employees } = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(groupId, { name, description, company, color, manager, employees }, { new: true });
    if (!updatedGroup) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }
    res.status(200).json({ success: true, data: updatedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller to delete a group by ID
exports.delete_group_by_id = async (req, res) => {
  try {
    const groupId = req.params.id;
    const deletedGroup = await Group.findByIdAndDelete(groupId);
    if (!deletedGroup) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }
    res.status(200).json({ success: true, message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


exports.change_group_color = async (req, res) => {
    try {
        const groupId = req.params.id;
        const { color } = req.body;
        const updatedGroup = await Group.findByIdAndUpdate(groupId, { color }, { new: true });
        if (!updatedGroup) {
            return res.status(404).json({ success: false, error: "Group not found" });
        }
        res.status(200).json({ success: true, data: updatedGroup });  
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}
