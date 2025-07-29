interface TaskAttributes {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  assignedToId: number;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TasksState {
  tasks: TaskAttributes[];
  loading: boolean;
  error: string | null;
  createTaskLoading: boolean;
  createTaskError: string | null;
  updateTaskLoading: boolean;
  updateTaskError: string | null;
  deleteTaskLoading: boolean;
  deleteTaskError: string | null;
}

interface TaskFormData {
  id?: string;
  title: string;
  description: string;
  assignedToId: string;
  ownerId: string;
}

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskFormData) => void;
  loading: boolean;
  mode: "create" | "edit";
  initialData?: TaskFormData;
  userList?: UserAttributes[];
}
