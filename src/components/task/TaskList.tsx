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
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'border-l-4 border-l-orange-400 bg-orange-50';
      case 'in-progress':
        return 'border-l-4 border-l-blue-400 bg-blue-50';
      case 'completed':
        return 'border-l-4 border-l-green-400 bg-green-50';
      default:
        return 'border-l-4 border-l-gray-400 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 min-h-[70vh] max-h-[70vh] overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 sticky top-0 z-[0]">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            heading.toLowerCase() === 'todo' ? 'bg-orange-400' :
            heading.toLowerCase() === 'in-progress' ? 'bg-blue-400' :
            heading.toLowerCase() === 'completed' ? 'bg-green-400' : 'bg-gray-400'
          }`}></div>
          <Text variant="h2" weight="semibold" className="text-gray-800">
            {heading}
          </Text>
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {todoList?.length || 0}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {todoList && todoList.length > 0 ? (
          todoList.map((item, index) => (
            <div
              className={`w-full p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${getStatusColor(heading)}`}
              key={item.id}
              onClick={() => onClick(item)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slide-up-fade 0.6s ease-out forwards',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <Text variant="h4" weight="semibold" className="text-gray-800 line-clamp-2">
                  {item.title}
                </Text>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(heading)}`}>
                  {heading}
                </div>
              </div>

              {/* Task Description */}
              <Text variant="body" className="text-gray-600 mb-4 line-clamp-2">
                {item.description}
              </Text>

              {/* Task Meta Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Created by:</span>
                  <span>{item.createdBy}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="font-medium">Assigned to:</span>
                  <span>{item.assignedTo}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Created:</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
    </div>
  );
};

export default TaskList;
