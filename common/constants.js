exports.RESPONSE_STATUS = {
  GONE: 410,
  CREATED: 201,
  SUCCESS: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  MODIFIED: 302,
  NOT_MODIFIED: 304,
};

exports.RESPONSE_MESSAGES = {
  REGISTER_SUCCESS: "Registered successfully",
  VERIFICATION_PENDING: "Verification by team pending",
  LINK_EXPIRED: "Link expired",
  USER_NAME_OR_PASSWORD_IS_INCORRECT: "Username or password is incorrect",
  SUCCESS: "Request successful",
  OTP_SENT: "Otp sent successfully",
  SMS_ERROR: "Error in sending otp",
  OTP_VERIFIED: "Otp verified successfully",
};
