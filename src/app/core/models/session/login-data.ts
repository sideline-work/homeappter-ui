import { Role } from "./role";

export interface LoginData {
  uid: number;
  memberMlsId: string;
  authToken: string;
  memberName: string;
  email: string;
  phoneNumber: string;
  role: Role,
  photo: string;
}




