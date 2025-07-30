import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showSuccessToast, showErrorToast } from "../utils/common.utils";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../store/slices/tasksSlice";

export const useTask = () => {
  const dispatch = useAppDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const {
    tasks,
    loading,
    error,
    createTaskLoading,
    updateTaskLoading,
    deleteTaskLoading,
  } = useAppSelector((state) => state.tasks);
  
  const {
    user: { data: currentUser },
  } = useAppSelector((state) => state.user);
  
  const isAdmin = currentUser?.isAdmin;
  const userId = currentUser?.id;

  const handleCreateTask = async (taskData: any) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      showSuccessToast({
        title: "Success!",
        text: "Task created successfully",
      });
      await dispatch(fetchTasks());
      setIsFormOpen(false);
    } catch (error) {
      showErrorToast({
        title: "Error!",
        text: (error as Error)?.message || "Failed to create task",
      });
    }
  };

  const handleEditTask = async (taskData: any) => {
    try {
      await dispatch(updateTask(taskData)).unwrap();
      showSuccessToast({
        title: "Success!",
        text: "Task updated successfully",
      });
      setIsEditModalOpen(false);
      setSelectedTask(null);
      dispatch(fetchTasks());
    } catch (error) {
      showErrorToast({
        title: "Error!",
        text: (error as Error)?.message || "Failed to update task",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      showSuccessToast({
        title: "Success!",
        text: "Task deleted successfully",
      });
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      showErrorToast({
        title: "Error!",
        text: (error as Error)?.message || "Failed to delete task",
      });
    }
  };

  const handleMoveToNext = async (task: any) => {
    try {
      const nextStatus =
        task.status === "pending" ? "in_progress" : "completed";

      await dispatch(
        updateTaskStatus({ taskId: task.id, status: nextStatus })
      ).unwrap();
      await dispatch(fetchTasks());
      showSuccessToast({
        title: "Success!",
        text: `Task moved to ${
          nextStatus === "in_progress" ? "In Progress" : "Completed"
        }`,
      });
      await dispatch(fetchTasks());
    } catch (error) {
      showErrorToast({
        title: "Error!",
        text: (error as Error)?.message || "Failed to move task",
      });
    }
  };

  const handleEditModalOpen = (task: any) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteModalOpen = (task: any) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeFormModal = () => setIsFormOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const openFormModal = () => setIsFormOpen(true);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return {
    // State
    isFormOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedTask,
    tasks,
    loading,
    error,
    createTaskLoading,
    updateTaskLoading,
    deleteTaskLoading,
    isAdmin,
    userId,

    // Actions
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    handleMoveToNext,
    handleEditModalOpen,
    handleDeleteModalOpen,
    
    // Modal controls
    closeFormModal,
    closeEditModal,
    closeDeleteModal,
    openFormModal,
  };
}; 