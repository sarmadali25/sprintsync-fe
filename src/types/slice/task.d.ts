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
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
}

interface TaskListProps {
  heading: string;
  todoList: any[];
  onClick: (item: any) => void;
  onEdit?: (task: any) => void;
  onDelete?: (task: any) => void;
  onMoveToNext?: (task: any) => void;
  isAdmin: boolean;
  userId: string;
}
