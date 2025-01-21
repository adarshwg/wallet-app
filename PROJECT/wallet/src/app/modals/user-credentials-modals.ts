export interface OTPModel extends String {}
export interface VerifyPasswordModel extends Boolean {}
export interface VerifyMudraPinModel extends Boolean {}
export interface VerifyUserExistsModel extends Boolean {}
export interface VerifyOTPModel{
    status: "success"|"failure"
}
export interface UserDetailsModel {
  username: string;
  email: string;
}
export interface UpdatePasswordModel {
  username: string;
  status: string;
}
export interface UpdateMudraPinModel {
  username: string;
  status: string;
}
