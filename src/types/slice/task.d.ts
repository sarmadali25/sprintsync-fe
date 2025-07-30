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
  generateAIDescriptionLoading: boolean;
  generateAIDescriptionError: string | null;
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
interface TaskListProps {
  heading: string;
  todoList: any[];
  onEdit?: (task: any) => void;
  onDelete?: (task: any) => void;
  onMoveToNext?: (task: any) => void;
  isAdmin: boolean;
  userId: string;
}

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  totalTime?: number;
  createdAt: string;
  updatedAt: string;
  assignedToId: string;
  ownerId: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  assignedTo: {
    firstName: string;
    lastName: string;
  };
}
