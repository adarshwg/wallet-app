export interface VerifyPasswordModel extends Boolean {}
export interface VerifyMudraPinModel extends Boolean {}
export interface VerifyUserExistsModel extends Boolean {}
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
export interface NewPassowrdModel {
  entered_password: string,
  new_password:string
}
export interface SignupModel{
  username:string,
  entered_password:string,
  entered_email:string,
  entered_mudra_pin:number
}