import { useEffect, useState } from "react";
import Button from "../button/Button"
import Text from "../text/Text"
import TaskList from "./TaskList"
import AddTaskForm from "./AddTaskForm"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTasks, createTask } from "../../store/slices/tasksSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const Task = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

    const { tasks, loading, error, createTaskLoading, createTaskError } = useAppSelector((state) => state.tasks);
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (loading) {
    return (
      <div className="md:max-w-[1600px] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5 py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <Text variant="h4" className="mt-4 text-gray-600">Loading tasks...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:max-w-[1600px] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5 py-8">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <Text variant="h4" className="text-red-600 mb-2">Error loading tasks</Text>
        <Text variant="body" className="text-gray-600">{error}</Text>
      </div>
    );
  }


      const handleCreateTask = async (taskData: any) => {
    try {
      const result = await dispatch(createTask(taskData)).unwrap();
      showSuccessToast({
        title: 'Success!',
        text: 'Task created successfully'
      });
      
      setIsFormOpen(false);
    } catch (error) {
      // Error toast
      showErrorToast({
        title: 'Error!',
        text: (error as Error)?.message || 'Failed to create task'
      });
    }
  };

    return (
      <>
        <div className="md:max-w-[1600px] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5">
          {/* Header */}
          <div className="w-full flex sm:flex-row flex-col sm:items-center sm:justify-between bg-white px-5 py-2 my-3 rounded-lg gap-2 sm:gap-0">
            <Text variant="h1" weight="semibold" className="text-primary">
              Task List
            </Text>
            <Button 
              variant="primary" 
              className="w-fit"
              onClick={() => setIsFormOpen(true)}
            >
              <Text variant="medium" className="">
                Create Task
              </Text>
            </Button>
          </div>
     
          {/* Boards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 mb-3 gap-2 ">
            <TaskList heading="TODO" todoList={tasks || []} onClick={() => {}} />
            <TaskList heading="In-Progress" todoList={tasks || []} onClick={() => {}} />
            <TaskList heading="Completed" todoList={tasks || []} onClick={() => {}} />
          </div>
        </div>

        {/* Add Task Form Modal */}
        <AddTaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateTask}
          loading={createTaskLoading}
        />
      </>
    )
}

export default Task;