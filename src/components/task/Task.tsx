import Text from "../text/Text";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Button from "../button/Button";
import DeleteConfirmation from "./TaskDelete";
import { useTask } from "../../hooks/useTask";

const Task = () => {
  const {
    tasks,
    error,
    userId,
    isAdmin,
    loading,
    isFormOpen,
    selectedTask,
    isEditModalOpen,
    isDeleteModalOpen,
    createTaskLoading,
    updateTaskLoading,
    deleteTaskLoading,

    handleEditTask,
    handleCreateTask,
    handleDeleteTask,
    handleMoveToNext,
    handleEditModalOpen,
    handleDeleteModalOpen,
    
    openFormModal,
    closeFormModal,
    closeEditModal,
    closeDeleteModal,
  } = useTask();

  if (loading) {
    return (
      <div className="md:max-w-[1600px] h-[calc(100vh_-_200px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5 py-">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <Text variant="h4" className="mt-4 text-gray-600">
          Loading tasks...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:max-w-[1600px] h-[calc(100vh_-_200px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5 py-8">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <Text variant="h4" className="text-red-600 mb-2">
          Error loading tasks
        </Text>
        <Text variant="body" className="text-gray-600">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className="md:max-w-[1600px] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5">
        {/* Header */}
        <div className="w-full flex sm:flex-row flex-col sm:items-center sm:justify-between bg-white px-5 py-2 my-3 rounded-lg gap-2 sm:gap-0">
          <Text variant="h1" weight="semibold" className="text-primary">
            Task List
          </Text>
          {isAdmin && (
            <Button
              variant="primary"
              className="w-fit"
              onClick={openFormModal}
            >
              <Text variant="medium" className="">
                Create Task
              </Text>
            </Button>
          )}
        </div>

        {/* Boards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 mb-3 gap-2 ">
          <TaskList
            heading="TODO"
            isAdmin={isAdmin || false}
            userId={userId || ""}
            todoList={tasks || []}
            onEdit={handleEditModalOpen}
            onDelete={handleDeleteModalOpen}
            onMoveToNext={handleMoveToNext}
          />
          <TaskList
            heading="In-Progress"
            isAdmin={isAdmin || false}
            userId={userId || ""}
            todoList={tasks || []}
            onEdit={handleEditModalOpen}
            onDelete={handleDeleteModalOpen}
            onMoveToNext={handleMoveToNext}
          />
          <TaskList
            heading="Completed"
            isAdmin={isAdmin || false}
            userId={userId || ""}
            todoList={tasks || []}
            onEdit={handleEditModalOpen}
            onDelete={handleDeleteModalOpen}
          />
        </div>
      </div>

      {/* Add Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={closeFormModal}
        onSubmit={handleCreateTask}
        loading={createTaskLoading}
        mode="create"
      />

      {/* Edit Modal */}
      <TaskForm
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditTask}
        loading={updateTaskLoading}
        mode="edit"
        initialData={
          selectedTask
            ? {
                id: selectedTask.id,
                title: selectedTask.title,
                description: selectedTask.description,
                assignedToId:
                  selectedTask.assignedToId ||
                  selectedTask.assignedTo?.id ||
                  "",
                ownerId: selectedTask.ownerId || selectedTask.owner?.id || "",
              }
            : undefined
        }
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteTask}
        taskTitle={selectedTask?.title || ""}
        taskId={selectedTask?.id || ""}
        loading={deleteTaskLoading}
      />
    </>
  );
};

export default Task;
