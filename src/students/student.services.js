
import { HTTP } from "../utils/httpStatus.js";
import * as repo from "./student.repository.js";

export const studentsGetService = async(props) =>{
    try{
        const request = {...props.body }
        const result = await repo.getStudents(request);
        return {
            ...HTTP.OK,
            message: "Students fetched successfully",
            data: result
        };
    }
    catch(err){
        return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Error in getting assets" };  
    }
}

export const studentGetService = async(req) =>{
    try{
      const { studentid } = req.params;
      const existingStudent = await repo.findStudentById(studentid);
      if (!existingStudent) {
          return { ...HTTP.NOT_FOUND, message: "Student not found" };
      }
      const studenData = await repo.getStudentWithMarks(studentid);
      return {
        ...HTTP.OK,
        message: "Student fetched successfully",
        data: studenData
    };

    }
    catch(err){
        console.log(err);
        return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Error in getting assets" };  
    }
}

export const studentCreateService =async(req) =>{
    try{
        const { email } = req.body;
        const existingAsset = await repo.findStudentByEmail(email);
            if (existingAsset) {
                return { ...HTTP.CONFLICT, message: "Student already exists" };
            }
         await repo.createStudent(req.body);
         return { ...HTTP.CREATED, message: "Student Created Succesfully" };
    }
    catch(err){
        console.log(err);
        return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Something went wrong in services." };  
    }
}

export const studentUpdateService =async(req) =>{
    try{
        const { id } = req.body;
         const existingStudent = await repo.findStudentById(id);
         if (!existingStudent) {
             return { ...HTTP.NOT_FOUND, message: "Student not found" };
         }
         const updateSuccess = await repo.updateStudent(req.body, id);

        if (!updateSuccess) {
            return { ...HTTP.SERVER_ERROR, message: "Failed to update asset" };
        }

          return { ...HTTP.OK, message: "Student Record Updated Succesfully" };
    }
    catch(err){
        console.log(err)
        return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Something went wrong in services." };  

    }
}

export const studentDeleteService = async(req) =>{
    const { studentid } = req.params;

    try{
        const existingAsset = await repo.findStudentById(studentid);
        if (!existingAsset) {
            return { ...HTTP.NOT_FOUND, message: "Student not found" };
        }

        const isDeleted = await repo.DeleteStudent(studentid);
        if (!isDeleted) {
            return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Failed to delete asset" };
        }
        return { ...HTTP.OK, message: "Student deleted successfully" };
    }
    catch(err){
        console.log(err);

    }
}

export const studentMarksUpdateService = async(req) =>{
    try{
        const { studentId } = req.body;
        const existingAsset = await repo.findStudentById(studentId);
        if (!existingAsset) {
            return { ...HTTP.NOT_FOUND, message: "Student not found" };
        }
        const marks = await repo.createStudentMarks(req.body);
        if(!marks){
            return {...HTTP.CONFLICT, message:'Student mark record with same examId already exists'}
        }
        return { ...HTTP.CREATED, message: "Student Record updated Succesfully" };

    }
    catch(err){
        console.log(err);
        return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Something went wrong in services." };  

    }
}
