import { Loader2, X } from "lucide-react";
import React from "react";

import Text from "../text/Text";
import { FormInput, FormButton, FormSelect } from "../form";
import { useTaskForm } from "../../hooks/useTaskForm";

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  mode,
  initialData,
}) => {
  const {
    formData,
    errors,
    userOptions,
    generateAIDescriptionLoading,
    handleInputChange,
    handleSubmit,
    handleClose,
    handleGenerateDescription,
  } = useTaskForm({
    mode,
    initialData,
    onSubmit,
  });

  const handleFormClose = () => {
    handleClose();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-100/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Text variant="h2" weight="semibold" className="text-gray-900">
            {mode === "create" ? "Add New Task" : "Edit Task"}
          </Text>
          <button
            onClick={handleFormClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          <FormInput
            id="title"
            name="title"
            label="Task Title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
            error={errors.title}
            required
          />

          <div className="relative">
            <FormInput
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              error={errors.description}
              required
              textarea={true}
              rows={4}
            />
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={!formData.title.trim() || generateAIDescriptionLoading}
              className="absolute top-2 right-2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate description from title"
            >
              {generateAIDescriptionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </button>
          </div>

          <FormSelect
            id="assignedToId"
            name="assignedToId"
            label="Assigned To"
            value={formData.assignedToId}
            onChange={handleInputChange}
            placeholder="Select assignee"
            error={errors.assignedToId}
            required
            options={userOptions}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleFormClose}
              className="flex-1 py-3 px-4 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Text variant="medium" className="text-gray-700">
                Cancel
              </Text>
            </button>

            <FormButton
              type="submit"
              isLoading={loading}
              disabled={loading}
              loadingText={mode === "create" ? "Creating..." : "Updating..."}
              className="flex-1"
            >
              {mode === "create" ? "Create Task" : "Update Task"}
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
