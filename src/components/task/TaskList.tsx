import { MoreVert, Edit, Delete, ArrowForward } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Text from "../text/Text";
import TaskDetailModal from "./TaskDetailModal";
import { useTaskList } from "../../hooks/useTaskList";

const TaskList = ({
  heading,
  todoList,
  onEdit,
  onDelete,
  onMoveToNext,
  isAdmin,
  userId,
}: TaskListProps) => {
  const {
    anchorEl,
    isDetailModalOpen,
    selectedTaskForDetail,
    filteredTasks,
    nextStatus,
    canMoveToNext,
    taskCount,
    getStatusCardColor,
    getStatusColor,
    getStatusText,
    getHeaderDotColor,
    getMoveButtonGradient,
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleMoveToNext,
    handleTaskClick,
    handleDetailModalClose,
  } = useTaskList(heading, todoList, onEdit, onDelete, onMoveToNext);

  return (
    <div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 min-h-[70vh] max-h-[70vh] overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 sticky top-0 z-[0]">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${getHeaderDotColor(heading)}`}
          ></div>
          <Text variant="h2" weight="semibold" className="text-gray-800">
            {heading}
          </Text>
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {taskCount}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((item, index) => (
            <div
              className={`w-full p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${getStatusCardColor(
                item.status
              )}`}
              key={item.id}
              onClick={() => handleTaskClick(item)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slide-up-fade 0.6s ease-out forwards",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <Text
                    variant="h4"
                    weight="semibold"
                    className="text-gray-800 line-clamp-2"
                  >
                    {item.title}
                  </Text>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusText(item.status)}
                  </div>
                  {isAdmin && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, item)}
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  )}
                </div>
              </div>

              {/* Task Description */}
              <Text variant="body" className="text-gray-600 mb-4 line-clamp-2">
                {item.description}
              </Text>

              {/* Task Meta Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">Created by:</span>
                  <span>
                    {item.owner?.firstName} {item.owner?.lastName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <span className="font-medium">Assigned to:</span>
                  <span>
                    {item.assignedTo?.firstName} {item.assignedTo?.lastName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Created:</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Move to Next Button */}
              {canMoveToNext && item?.assignedToId === userId && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveToNext(item);
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${getMoveButtonGradient(heading)}`}
                  >
                    <ArrowForward fontSize="small" />
                    <span>
                      Move to{" "}
                      {nextStatus === "in_progress"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <Text variant="h4" weight="medium" className="text-gray-500 mb-2">
              No tasks yet
            </Text>
            <Text variant="body" className="text-gray-400">
              Tasks will appear here when they're added
            </Text>
          </div>
        )}
      </div>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          className: "mt-2 shadow-lg border border-gray-200",
        }}
      >
        <MenuItem onClick={handleEdit} className="py-2 px-4">
          <ListItemIcon>
            <Edit fontSize="small" className="text-blue-600" />
          </ListItemIcon>
          <ListItemText primary="Edit Task" className="text-gray-700" />
        </MenuItem>
        <MenuItem onClick={handleDelete} className="py-2 px-4">
          <ListItemIcon>
            <Delete fontSize="small" className="text-red-600" />
          </ListItemIcon>
          <ListItemText primary="Delete Task" className="text-gray-700" />
        </MenuItem>
      </Menu>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleDetailModalClose}
        task={selectedTaskForDetail as Task}
      />
    </div>
  );
};

export default TaskList;
