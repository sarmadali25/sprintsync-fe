import React from "react";
import { X, AlertTriangle } from "lucide-react";
import Text from "../text/Text";


const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  taskId,
  loading = false
}) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50/50 via-red-50/50 to-pink-100/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <Text variant="h2" weight="semibold" className="text-gray-900">
              Delete Task
            </Text>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Text variant="body" className="text-gray-600 mb-4">
            Are you sure you want to delete the task "{taskTitle}"? This action cannot be undone.
          </Text>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <Text variant="body" className="text-red-700 text-sm">
              <strong>Warning:</strong> This will permanently remove the task and all associated data.
            </Text>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-4 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Text variant="medium" className="text-gray-700">
                Cancel
              </Text>
            </button>
            
            <button
              type="button"
              onClick={()=>onConfirm(taskId)}
              disabled={loading}
              className="flex-1 py-3 px-4 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Text variant="medium" className="text-white">
                {loading ? "Deleting..." : "Delete Task"}
              </Text>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation; 