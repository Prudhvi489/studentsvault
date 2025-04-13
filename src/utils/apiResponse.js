export const apiResponse = (res, status, message, data = null, errors = null) => {
    const response = { status, message };
  
      if (data !== null) {
          response.data = data;
      }
      if (errors !== null) {
          response.errors = errors;
      }
      return res.status(status).json(response);
    };
    