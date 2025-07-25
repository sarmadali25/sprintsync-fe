import { useEffect, useState } from "react";
import Button from "../button/Button"
import Text from "../text/Text"
import TaskList from "./TaskList"
import AddTaskForm from "./AddTaskForm"

const Task = () => {
    const [todoList, setTodoList] = useState<any[]>();
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
      const fetchTodoList = async () => {
        const data = [
          {
            id: 1,
            title: "First task",
            description: "This is the first task",
            createdBy: "John Doe",
            assignedTo: "Jane Doe",
            createdAt: "2025-07-25",
            updatedAt: "2025-07-25",
          },
          {
            id: 2,
            title: "Second task",
            description: "This is the second task",
            createdBy: "John Doe",
            assignedTo: "Jane Doe",
            createdAt: "2025-07-25",
            updatedAt: "2025-07-25",
          },
          {
            id: 3,
            title: "Third task",
            description: "This is the third task",
            createdBy: "John Doe",
            assignedTo: "Jane Doe",
            createdAt: "2025-07-25",
            updatedAt: "2025-07-25",
          },
          {
            id: 4,
            title: "Fourth task",
            description: "This is the fourth task",
            createdBy: "John Doe",
            assignedTo: "Jane Doe",
            createdAt: "2025-07-25",
            updatedAt: "2025-07-25",
          },
          {
            id: 5,
            title: "Fifth task",
            description: "This is the fifth task",
            createdBy: "John Doe",
            assignedTo: "Jane Doe",
            createdAt: "2025-07-25",
            updatedAt: "2025-07-25",
          },
          {
            id: 6,
            title: "Sixth task",
            description: "This is the sixth task",
            createdBy: "John Doe",
            assignedTo: "Jane Doe",
            createdAt: "2025-07-25",
            updatedAt: "2025-07-25",
          },
        ];
        setTodoList(data);
      };
      fetchTodoList();
    }, []);

    const handleCreateTask = async (taskData: any) => {
      const newTask = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description,
        createdBy: "Current User", // You can replace this with actual user data
        assignedTo: taskData.assignedTo,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      
      setTodoList(prev => [...(prev || []), newTask]);
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
            <TaskList heading="TODO" todoList={todoList || []} onClick={() => {}} />
            <TaskList heading="In-Progress" todoList={todoList || []} onClick={() => {}} />
            <TaskList heading="Completed" todoList={todoList || []} onClick={() => {}} />
          </div>
        </div>

        {/* Add Task Form Modal */}
        <AddTaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateTask}
        />
      </>
    )
}

export default Task;