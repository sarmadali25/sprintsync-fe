interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (taskId: string) => void;
  taskTitle: string;
  taskId: any;
  loading?: boolean;
}
