import { useState, useMemo } from "react";
import { getStatusFromHeading, getStatusColor, getStatusText, formatDate, getNextStatus, getStatusCardColor, getHeaderDotColor, getMoveButtonGradient } from "../utils/common.utils";

export const useTaskList = (
  heading: string,
  todoList: Task[],
  onEdit?: (task: Task) => void,
  onDelete?: (task: Task) => void,
  onMoveToNext?: (task: Task) => void
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null);


  
  const filteredTasks = useMemo(() => {
    return todoList.filter(
      (task) => task.status === getStatusFromHeading(heading)
    );
  }, [todoList, heading]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleEdit = () => {
    if (onEdit && selectedTask) {
      onEdit(selectedTask);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (onDelete && selectedTask) {
      onDelete(selectedTask);
    }
    handleMenuClose();
  };

  const handleMoveToNext = (task: Task) => {
    if (onMoveToNext) {
      onMoveToNext(task);
    }
  };

  // Detail modal handlers
  const handleTaskClick = (task: Task) => {
    setSelectedTaskForDetail(task);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedTaskForDetail(null);
  };

  // Computed values
  const nextStatus = getNextStatus(heading);
  const canMoveToNext = nextStatus !== null;
  const taskCount = filteredTasks?.length || 0;

  return {
    anchorEl,
    selectedTask,
    isDetailModalOpen,
    selectedTaskForDetail,
    filteredTasks,

    nextStatus,
    canMoveToNext,
    taskCount,
    
    getStatusFromHeading,
    getNextStatus,
    getStatusCardColor,
    getStatusColor,
    getStatusText,
    getHeaderDotColor,
    getMoveButtonGradient,
    formatDate,
    
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleMoveToNext,
    handleTaskClick,
    handleDetailModalClose,
  };
}; 