import { HTTP } from "../utils/httpStatus.js";

export const validate = (schema) => (req, res, next) => {
  console.log("Entering here")
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.errors[0];
    return res.status(HTTP.BAD_REQUEST.code).json({
      status: HTTP.BAD_REQUEST.code,
      message: HTTP.BAD_REQUEST.message,
      error: {
        field: firstError.path[0], 
        message: firstError.message
      }
    });
  }
  next(); 
};
