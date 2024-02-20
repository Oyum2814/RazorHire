import { postRequest } from "./_setup";

export function postLoginGoogle(body) {
  return postRequest(`/auth/login`, body);
}
