import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showErrorToast } from "../utils/common.utils";
import { fetchUserList } from "../store/slices/userSlice";
import { generateAIDescription } from "../store/slices/tasksSlice";

interface UseTaskFormProps {
  mode: "create" | "edit";
  initialData?: TaskFormData;
  onSubmit: (task: TaskFormData) => void;
}

export const useTaskForm = ({ mode, initialData, onSubmit }: UseTaskFormProps) => {
  const dispatch = useAppDispatch();

  const { generateAIDescriptionLoading } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.user);
  const isAdmin = user?.data?.isAdmin;
  const { userList } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignedToId: "",
    ownerId: "",
  });
  const [errors, setErrors] = useState<Partial<TaskFormData>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const userOptions =
    userList?.data?.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    })) || [];

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (!formData.assignedToId.trim()) {
      newErrors.assignedToId = "Assignee is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    
    // Reset form only for create mode
    if (mode === "create") {
      setFormData({
        title: "",
        description: "",
        assignedToId: "",
        ownerId: user?.data?.id || "",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    if (mode === "create") {
      setFormData({
        title: "",
        description: "",
        assignedToId: user?.data?.id || "",
        ownerId: user?.data?.id || "",
      });
      setErrors({});
    }
  };

  const handleGenerateDescription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(generateAIDescription({ title: formData.title })).unwrap();
      setFormData((prev) => ({
        ...prev,
        description: response,
      }));
    } catch (error) {
      showErrorToast({
        title: "Error!",
        text: (error as Error)?.message || "Failed to generate AI description",
      });
    }
  };

  // Initialize form data based on mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    } else if (mode === "create") {
      setFormData({
        title: "",
        description: "",
        assignedToId: "",
        ownerId: user?.data?.id || "",
      });
    }
  }, [mode, initialData, user?.data?.id]);

  // Fetch user list for admin users
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchUserList());
    }
  }, [isAdmin, dispatch]);

  return {
    // State
    formData,
    errors,
    userOptions,
    isAdmin,
    generateAIDescriptionLoading,
    
    // Actions
    handleInputChange,
    handleSubmit,
    handleClose,
    handleGenerateDescription,
    validateForm,
  };
}; 