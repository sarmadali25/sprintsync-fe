import { useEffect, useState } from "react";
import Button from "../button/Button"
import Text from "../text/Text"
import TaskList from "./TaskList"

const Task = () => {
    const [todoList, setTodoList] = useState<any[]>();

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

    return (
        <div className="md:max-w-[1600px] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg shadow-lg px-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between bg-white px-5 py-2 my-3 rounded-lg">
          <Text variant="h0" className="text-primary">
            Work Board
          </Text>
          <Button variant="primary">
            <Text variant="medium" className="">
              Create Board
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
    )
}

export default Task;