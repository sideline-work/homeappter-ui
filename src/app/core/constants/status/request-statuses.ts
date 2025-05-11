import { RequestStatus } from "@core/models/showings";

export const REQUEST_STATUSES = [
  { label: 'Open', value: RequestStatus.OPEN },
  { label: 'In-Progress', value: RequestStatus.INPROGRESS },
  { label: 'Update Needed ', value: RequestStatus.UPDATE_NEEDED },
  { label: 'Cancelled', value: RequestStatus.CANCELLED },
  { label: 'Closed', value: RequestStatus.CLOSED },
];
