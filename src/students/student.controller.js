import { apiResponse } from "../utils/apiResponse.js";
import { studentCreateService, studentsGetService, studentUpdateService, studentGetService, studentDeleteService, studentMarksUpdateService } from "./student.services.js";

export const apiStudentsGet = async(req, res) =>{
    const response = await studentsGetService(req);
    return apiResponse(res, response.code, response.message, response.data);
}

export const apiStudentGet = async(req, res) =>{
    const response = await studentGetService(req);
    return apiResponse(res, response.code, response.message, response.data);
}

export const apiStudentCreate = async(req, res) => {
    const response = await studentCreateService(req);
    return apiResponse(res, response.code, response.message);
}

export const apiStudentUpdate = async(req, res) =>{
    const response = await studentUpdateService(req);
    return apiResponse(res, response.code, response.message);
}

export const apiStudentDelete =async(req, res) =>{
    const response = await studentDeleteService(req);
    return apiResponse(res, response.code, response.message);
}

export const apiStudentMarksUpdate = async(req, res) => {
    const response = await studentMarksUpdateService(req);
    return apiResponse(res, response.code, response.message);
}