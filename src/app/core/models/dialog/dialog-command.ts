export interface DialogCommand {
  type: string;
  key: string;
  disableIcon?: boolean;
  header: string;
  message: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  styleClass?: string;
  onAccept: () => void;
  onReject?: () => void;
}
