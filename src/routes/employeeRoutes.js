
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const {
    employeeValidation,
    validateEmployee
} = require('../validators/employeeValidator');

const router = express.Router();

router.use(authMiddleware);

router.get('/employees', getEmployees);

router.post(
    '/employees',
    employeeValidation,
    validateEmployee,
    createEmployee
);

router.get('/employees/:eid', getEmployeeById);

router.put(
    '/employees/:eid',
    employeeValidation,
    validateEmployee,
    updateEmployee
);

router.delete('/employees', deleteEmployee);

module.exports = router;
