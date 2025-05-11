import { AppointmentResponse, MemberResponse } from ".";

export interface AppointmentListResponse {
  appointmentList: AppointmentResponse [] ;
  memberList: MemberResponse [];
}
