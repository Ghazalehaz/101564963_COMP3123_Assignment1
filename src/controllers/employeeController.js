
const Employee = require('../models/Employee');
const mongoose = require('mongoose');

const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find({
            user: req.user.id
        });

        res.status(200).json({
            message: 'Employees retrieved successfully',
            employees
        });

    } catch (error) {
        next(error);
    }
};

const createEmployee = async (req, res, next) => {
    try {
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = req.body;

        const employee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            user: req.user.id
        });

        res.status(201).json({
            message: 'Employee created successfully',
            employee
        });

    } catch (error) {
        next(error);
    }
};


const getEmployeeById = async (req, res, next) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }

        const employee = await Employee.findOne({
            _id: eid,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee retrieved successfully',
            employee
        });

    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }

        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = req.body;

        const employee = await Employee.findOneAndUpdate(
            {
                _id: eid,
                user: req.user.id
            },
            {
                $set: {
                    first_name,
                    last_name,
                    email,
                    position,
                    salary,
                    date_of_joining,
                    department
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee updated successfully',
            employee
        });

    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const { eid } = req.query;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }

        const employee = await Employee.findOneAndDelete({
            _id: eid,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        return res.status(204).send();

    } catch (error) {
        next(error);
    }
};



module.exports = {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};