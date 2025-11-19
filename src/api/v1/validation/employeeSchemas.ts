import Joi from "joi";
import { Employee } from "../models/employeeModel";

/**
 * @openapi
 * components:
 *   schemas:
 *     EmployeeInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - position
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           example: "parm Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "parm@example.com"
 *         position:
 *           type: string
 *           example: "Manager"
 *         branchId:
 *           type: string
 *           example: "branch_123"
 *
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         position:
 *           type: string
 *         branchId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/** Joi validation used by routes */
export const createEmployeeSchema = Joi.object<Employee>({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  branchId: Joi.string().required(),
});

export const updateEmployeeSchema = Joi.object<Partial<Employee>>({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  position: Joi.string().min(2).max(50),
  branchId: Joi.string(),
});
