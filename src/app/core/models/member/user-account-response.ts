
export interface UserAccountResponse {
  uid: number;
  memberMlsId: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  photo: string;
  receivedNotif: boolean;
  dateRegistered: Date;
}

