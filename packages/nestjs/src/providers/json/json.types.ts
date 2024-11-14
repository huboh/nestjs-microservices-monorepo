export type ResponseStatus = "success" | "error";

export interface ResponseError extends Error {
  cause?: any;
}

export interface SendJsonProps {
  /**
   * response status code, defaults to `200`
   */
  statusCode: number;
  /**
   * the response status (`"success"` | `"error"`), default value depends on the `statusCode`(statusCode of `>=200` = `'success'` & `>=500` = "error")
   */
  status?: ResponseStatus;
  message?: string;
  error?: ResponseError;
  data?: any;
}