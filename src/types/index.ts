export interface ParamsType {
  search: string;
  page: number;
  limit: number;
}
export interface ModalProps {
  open: boolean;
  update?: any;
  handleCancel: () => void;
}
