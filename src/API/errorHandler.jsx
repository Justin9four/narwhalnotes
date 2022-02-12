const badRequestErrorMessage = "Bad Request: ";
const notFoundErrorMessage = "Data Not Found: ";
const conflictErrorMessage = "Data Conflict: ";

const familiarErrorCodes = [100, 101];

const handleServerError = (response) => {
  if (response.status === 200) {
    return;
  }

  switch (response.status) {
    case 400:
      const responseBody = JSON.parse(response.body);
      let returnError = "";
      if (responseBody && responseBody[0]) {
        responseBody.forEach((error) => {
          // Field Validation Errors
          if (familiarErrorCodes.includes(error.errorCode)) {
            returnError +=
              error.details.errorMessage +
              " for " +
              error.details.fields +
              ". ";
          } else {
            returnError +=
              badRequestErrorMessage + error.details.errorMessage + ". ";
          }
        });
      } else {
        returnError = badRequestErrorMessage + responseBody;
      }
      throw Error(returnError);
    case 401:
      throw Error(response.body);
    case 404:
      throw Error(notFoundErrorMessage + response.body);
    case 409:
      throw Error(conflictErrorMessage + response.body);
    default:
      console.error("Undefined server error with status " + response.status);
      return;
  }
};

export {handleServerError};
