import { useMemo } from "react";
import {
  formatDate,
  getStatusText,
  getStatusColor,
  formatTimeSpent,
} from "../utils/common.utils";

export const useTaskDetail = (task: Task | null) => {
  const taskDetails = useMemo(() => {
    if (!task) return null;

    const statusText = getStatusText(task.status);
    const statusColor = getStatusColor(task.status);
    const formattedTimeSpent = task.totalTime
      ? formatTimeSpent(task.totalTime)
      : null;
    const formattedCreatedDate = formatDate(task.createdAt);
    const formattedUpdatedDate = formatDate(task.updatedAt);
    const isInProgress = statusText === "In Progress";
    const isCompleted = statusText === "Completed";
    const showStartedOn = isInProgress && task.totalTime;
    const showTotalTime = isCompleted;

    return {
      statusText,
      statusColor,
      formattedTimeSpent,
      formattedCreatedDate,
      formattedUpdatedDate,
      isInProgress,
      isCompleted,
      showStartedOn,
      showTotalTime,
    };
  }, [task]);

  return {
    taskDetails,
    formatTimeSpent,
    getStatusColor,
    getStatusText,
    formatDate,
  };
};
