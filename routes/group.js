const express = require("express");
const router = express.Router();
const {
    create_group,
    get_by_company,
    get_group_by_id,
    get_group_by_manager,
    update_group_by_id,
    change_group_color
} = require("../controllers/group.controller");

router.post("/create", create_group);
router.get("/company/:company", get_by_company);
router.get("/:id", get_group_by_id);
router.get("/manager/:manager", get_group_by_manager);
router.put("/:id", update_group_by_id);
router.put("/color/:id", change_group_color);


module.exports = router;