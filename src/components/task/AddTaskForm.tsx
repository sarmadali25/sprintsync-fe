import React, { useState } from "react";
import { X } from "lucide-react";
import { FormInput, FormButton } from "../form";
import Text from "../text/Text";

interface TaskFormData {
  title: string;
  description: string;
  assignedTo: string;
}

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskFormData) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [errors, setErrors] = useState<Partial<TaskFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof TaskFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = "Assignee is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-100/50  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Text variant="h2" weight="semibold" className="text-gray-900">
            Add New Task
          </Text>
          <button
            onClick={handleClose}
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

          <FormInput
            id="assignedTo"
            name="assignedTo"
            label="Assigned To"
            type="text"
            value={formData.assignedTo}
            onChange={handleInputChange}
            placeholder="Enter assignee name"
            error={errors.assignedTo}
            required
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Text variant="medium" className="text-gray-700">
                Cancel
              </Text>
            </button>
            
            <FormButton
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              loadingText="Creating..."
              className="flex-1"
            >
              Create Task
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm; 