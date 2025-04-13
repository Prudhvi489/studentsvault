import db from "../models/index.js";
import { HTTP } from "../utils/httpStatus.js";
const { Student, Mark } = db;
export const findStudentByEmail = async(email) =>{
    try{
        return await Student.findOne({ where: { email } });
    }
    catch(err){
        console.log(err)
        return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Something went wrong." };  
    }
}

export const findStudentById = async(id)=>{
  try{
    return Student.findByPk(id);
  }
  catch(err){
    console.log(err)
  }
}

export const getStudents = async(props) => {
  const { page =1, pageSize =10, id } = props;
  try{
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const { count, rows: assets } = await Student.findAndCountAll({
          limit,
          offset,
          order: [["created_at", "DESC"]]
      });
      return {
          assets,
          totalRecords: count,
      };
  }
  catch(err){
      console.log(err)
  }
}

export const createStudent = async (props) => {
    try {
      return await Student.create(props);
    } catch (err) {
      console.error(err);
      return { ...HTTP.INTERNAL_SERVER_ERROR, message: "Something went wrong." };
    }
  };

  export const updateStudent = async (props, studentid) => {
    try{     
        const [updatedCount] = await Student.update(props, { where: {id:studentid} });
        return updatedCount > 0;
   }
    catch(err){
        console.log(err);
        return false;
    }
}

export const DeleteStudent = async(id) =>{
  try{
      return await Student.destroy({ where: { id } });
  }
  catch(err){
      return false; 
  }
}

export const createStudentMarks = async (props) => {
  try{
     const {studentId, examId, subject} = props;
     // Check if a record with the same studentId, examId, and subject exists
     const existingRecord = await Mark.findOne({
      where: {
        studentId,
        examId,
        subject,
      },
    });

    if (existingRecord) {
      return false;
    }
    return await Mark.create(props);
  }
  catch(err){
    console.log(err);

  }
}

export const getStudentWithMarks= async(studentId) =>{
  try {
    const student = await Student.findOne({
      where: { id: studentId },
      include: [
        {
          model: Mark,
          as: 'marks',
        },
      ],
    });

    if (!student) {
      console.log('Student not found');
      return null;
    }

    return student;
  } catch (error) {
    console.error('Error fetching student with marks:', error);
    throw error;
  }
}
  
