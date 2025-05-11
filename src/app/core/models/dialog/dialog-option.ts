export interface DialogOption {
  key?: string;
  header?: string;
  headerKey?: string;
  disableIcon?: boolean;
  message?: string;
  messageKey?: string;
  rejectKey?: string;
  acceptKey?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  styleClass?: string;
  onAccept: () => void;
  onReject?: () => void;
}
