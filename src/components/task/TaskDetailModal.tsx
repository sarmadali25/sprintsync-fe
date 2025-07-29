import React from "react";
import { X, Calendar, User, Users } from "lucide-react";
import Text from "../text/Text";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  if (!isOpen || !task) return null;
  const formatTimeSpent = (minutes: number): string => {
    if (!minutes || minutes <= 0) return "0 minutes";

    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const mins = minutes % 60;

    let result = "";

    if (days > 0) {
      result += `${days} Days `;
    }

    if (hours > 0) {
      result += `${hours} Hours `;
    }

    if (mins > 0 || (days === 0 && hours === 0)) {
      result += `${mins} Minutes`;
    }

    return result.trim();
  };
  const timeSpentInMinutes = task?.totalTime;
  const formattedTimeSpent = formatTimeSpent(timeSpentInMinutes);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "in_progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "TODO";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-100/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <Text variant="h2" weight="semibold" className="text-gray-900">
                Task Details
              </Text>
              <div
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(
                  task.status
                )}`}
              >
                {getStatusText(task.status)}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Task Title */}
          <div className="mb-6">
            <Text variant="h3" weight="semibold" className="text-gray-900 mb-2">
              {task.title}
            </Text>
          </div>

          {/* Task Description */}
          <div className="mb-6">
            <Text variant="h4" weight="medium" className="text-gray-700 mb-3">
              Description
            </Text>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[250px] max-h-[250px] overflow-y-auto">
              <Text
                variant="body"
                className="text-gray-700 whitespace-pre-wrap"
              >
                {task.description}
              </Text>
            </div>
          </div>

          {getStatusText(task.status) === "In Progress" && task?.totalTime && (
            <div className="mb-6">
              <Text variant="h4" weight="medium" className="text-gray-700 mb-3">
                Started on:{" "}
                <span className="text-sm text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Text>
            </div>
          )}
          {/* Total Time Spent */}
          {getStatusText(task.status) === "Completed" && (
            <div className="mb-6">
              <Text variant="h4" weight="medium" className="text-gray-700 mb-3">
                Total Time Spent:{" "}
                <span className="text-sm text-gray-500">{`${formattedTimeSpent}`}</span>
              </Text>
            </div>
          )}

          {/* Task Meta Information */}
          <div className="space-y-4">
            <Text variant="h4" weight="medium" className="text-gray-700 mb-3">
              Task Information
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Created by */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <Text variant="body" className="text-gray-500 text-sm">
                    Created by
                  </Text>
                  <Text
                    variant="body"
                    weight="medium"
                    className="text-gray-700"
                  >
                    {task.owner?.firstName} {task.owner?.lastName}
                  </Text>
                </div>
              </div>

              {/* Assigned to */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <Text variant="body" className="text-gray-500 text-sm">
                    Assigned to
                  </Text>
                  <Text
                    variant="body"
                    weight="medium"
                    className="text-gray-700"
                  >
                    {task.assignedTo?.firstName} {task.assignedTo?.lastName}
                  </Text>
                </div>
              </div>

              {/* Created date */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <Text variant="body" className="text-gray-500 text-sm">
                    Created on
                  </Text>
                  <Text
                    variant="body"
                    weight="medium"
                    className="text-gray-700"
                  >
                    {new Date(task.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </div>
              </div>

              {/* Updated date */}
              {task.updatedAt && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <Text variant="body" className="text-gray-500 text-sm">
                      Last updated
                    </Text>
                    <Text
                      variant="body"
                      weight="medium"
                      className="text-gray-700"
                    >
                      {new Date(task.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Text variant="medium" className="text-gray-700">
              Close
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
