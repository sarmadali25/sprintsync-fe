import Text from "../text/Text";

const TaskList = ({
  heading,
  todoList,
  onClick,
}: {
  heading: string;
  todoList: any[];
  onClick: (item: any) => void;
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-start bg-white rounded-lg min-h-[70vh] max-h-[70vh]">
      <div className="w-full flex flex-col items-start justify-start sticky top-0 bg-white">
        <Text variant="h1" className="text-primary px-2 py-2">
          {heading}
        </Text>
        <div className="border-2 border-gray-300 w-full"></div>
      </div>

      <div className="h-full w-full flex flex-col items-start justify-start px-2 py-2 overflow-y-auto">
        {todoList && todoList.length > 0 ? (
          todoList.map((item) => (
            <div
              className="w-full flex flex-col items-start justify-start px-4 py-2 my-1 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300"
              key={item.id}
              onClick={() => {
                onClick(item);
              }}
            >
              <Text variant="h4" weight="semibold">
                {item.title}
              </Text>
              <Text variant="medium">{item.description}</Text>
              <Text variant="medium">Created by: {item.createdBy}</Text>
              <Text variant="medium">Assigned to: {item.assignedTo}</Text>
              <Text variant="medium">Created at: {item.createdAt}</Text>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-start justify-start">
            <Text variant="medium">No tasks found</Text>
          </div>
        )}
        {todoList && todoList.length === 0 && (
          <div className="w-full flex flex-col items-start justify-start">
            <Text variant="medium">No tasks found</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
