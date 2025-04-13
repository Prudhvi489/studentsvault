// validations/studentValidation.js
import { z } from 'zod';
import { apiStudentCreate, apiStudentDelete, apiStudentGet, apiStudentsGet, apiStudentUpdate, apiStudentMarksUpdate } from './student.controller.js';
import {validate} from '../middlewares/validateRequest.js'

//  Validation for creating a new student
export const createStudentSchema = z.object({
  name: z.string().min(1, "Student name is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  email: z.string().email("Invalid email address")
});

//  Validation for updating a student (all fields optional, but still validated)
export const updateStudentSchema = z.object({
  id: z.number().int().positive("ID must be a positive integer"),
  name: z.string().min(1, "Student name cannot be empty").optional(),
  age: z.number().int().positive("Age must be a positive integer").optional(),
  email: z.string().email("Invalid email address").optional()
});

export const createMarksSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  examId: z.number({ invalid_type_error: 'Exam ID must be a number' })
  .int('Exam ID must be an integer')
  .positive('Exam ID must be a positive integer'),
  marks: z
    .number({ invalid_type_error: 'Marks must be a number' })
    .int('Marks must be an integer')
    .nonnegative('Marks must be zero or positive'),
  studentId: z
    .number({ invalid_type_error: 'Student ID must be a number' })
    .int('Student ID must be an integer')
    .positive('Student ID must be a positive integer'),
});

export function studentRoutes (app) {
    app.post('/get-sudents', apiStudentsGet);
    app.get('/get-student/:studentid', apiStudentGet);
    app.post('/create-student', validate(createStudentSchema),  apiStudentCreate);
    app.patch('/update-student', validate(updateStudentSchema),  apiStudentUpdate);
    app.delete('/student/:studentid', apiStudentDelete);

    /**Updating the student marks */
    app.post('/update-marks', validate(createMarksSchema), apiStudentMarksUpdate);
}