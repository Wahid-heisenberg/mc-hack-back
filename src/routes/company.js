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

// Routes for creating, getting, updating, and changing group color
router.post("/create", create_group);
router.get("/company/:company", get_by_company);
router.get("/:id", get_group_by_id);
router.get("/manager/:manager", get_group_by_manager);
router.patch("/:id", update_group_by_id);
router.patch("/color/:id", change_group_color);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: Group management
 */

/**
 * @swagger
 * /groups/create:
 *  post:
 *    summary: Create a new group
 *    tags: [Group]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              company:
 *                type: string
 *              manager:
 *                type: string
 *              color:
 *                type: string
 *            required:
 *              - name
 *              - company
 *              - manager
 *              - color
 *    responses:
 *      '201':
 *        description: Group created successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

/**
 * @swagger
 * /groups/company/{company}:
 *  get:
 *    summary: Get groups by company
 *    tags: [Group]
 *    parameters:
 *      - in: path
 *        name: company
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Group'
 *      '404':
 *        description: No groups found
 *      '500':
 *        description: Internal server error
 */

/**
 * @swagger
 * /groups/{id}:
 *  get:
 *    summary: Get group by ID
 *    tags: [Group]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Group'
 *      '404':
 *        description: Group not found
 *      '500':
 *        description: Internal server error
 */

/**
 * @swagger
 * /groups/manager/{manager}:
 *  get:
 *    summary: Get groups by manager
 *    tags: [Group]
 *    parameters:
 *      - in: path
 *        name: manager
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Group'
 *      '404':
 *        description: No groups found
 *      '500':
 *        description: Internal server error
 */

/**
 * @swagger
 * /groups/{id}:
 *  patch:
 *    summary: Update group by ID
 *    tags: [Group]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Group'
 *    responses:
 *      '200':
 *        description: Group updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Group not found
 *      '500':
 *        description: Internal server error
 */

/**
 * @swagger
 * /groups/color/{id}:
 *  patch:
 *    summary: Change group color by ID
 *    tags: [Group]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              color:
 *                type: string
 *            required:
 *              - color
 *    responses:
 *      '200':
 *        description: Group color changed successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Group not found
 *      '500':
 *        description: Internal server error
 */
