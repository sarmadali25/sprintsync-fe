import Swal from 'sweetalert2';


interface ToastConfig {
  title?: string;
  text?: string;
  timer?: number;
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
}

// Default toast configuration
const defaultConfig: ToastConfig = {
  timer: 3000,
  position: 'top-end',
};

// Success toast
export const showSuccessToast = (config: ToastConfig = {}) => {
  Swal.fire({
    icon: 'success',
    title: config.title || 'Success!',
    text: config.text || 'Operation completed successfully',
    toast: true,
    position: config.position || defaultConfig.position,
    showConfirmButton: false,
    timer: config.timer || defaultConfig.timer,
    timerProgressBar: true,
  });
};

// Error toast
export const showErrorToast = (config: ToastConfig = {}) => {
  Swal.fire({
    icon: 'error',
    title: config.title || 'Error!',
    text: config.text || 'Something went wrong',
    toast: true,
    position: config.position || defaultConfig.position,
    showConfirmButton: false,
    timer: config.timer || defaultConfig.timer,
    timerProgressBar: true,
  });
};

// Warning toast
export const showWarningToast = (config: ToastConfig = {}) => {
  Swal.fire({
    icon: 'warning',
    title: config.title || 'Warning!',
    text: config.text || 'Please check your input',
    toast: true,
    position: config.position || defaultConfig.position,
    showConfirmButton: false,
    timer: config.timer || defaultConfig.timer,
    timerProgressBar: true,
  });
};

// Info toast
export const showInfoToast = (config: ToastConfig = {}) => {
  Swal.fire({
    icon: 'info',
    title: config.title || 'Info',
    text: config.text || 'Here is some information',
    toast: true,
    position: config.position || defaultConfig.position,
    showConfirmButton: false,
    timer: config.timer || defaultConfig.timer,
    timerProgressBar: true,
  });
};

// Question toast
export const showQuestionToast = (config: ToastConfig = {}) => {
  Swal.fire({
    icon: 'question',
    title: config.title || 'Question',
    text: config.text || 'Are you sure?',
    toast: true,
    position: config.position || defaultConfig.position,
    showConfirmButton: false,
    timer: config.timer || defaultConfig.timer,
    timerProgressBar: true,
  });
};

// Custom toast with full configuration
export const showCustomToast = (config: any) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    ...config,
  });
}; 


export const formatTimeSpent = (minutes: number): string => {
  if (!minutes || minutes <= 0) return "0 minutes";

  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const mins = minutes % 60;

  let result = "";

  if (days > 0) {
    result += `${days} Days `;
  }

  if (hours > 0) {
    result += `${hours} Hours `;
  }

  if (mins > 0 || (days === 0 && hours === 0)) {
    result += `${mins} Minutes`;
  }

  return result.trim();
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "in_progress":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};


export const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "TODO";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

export const getStatusFromHeading = (heading: string) => {
  switch (heading.toLowerCase()) {
    case "todo":
      return "pending";
    case "in-progress":
      return "in_progress";
    case "completed":
      return "completed";
    default:
      return "pending";
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getNextStatus = (heading: string) => {
  switch (heading.toLowerCase()) {
    case "todo":
      return "in_progress";
    case "in-progress":
      return "completed";
    default:
      return null;
  }
};


export const getStatusCardColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "border-l-4 border-l-orange-400 bg-orange-50";
    case "in_progress":
      return "border-l-4 border-l-blue-400 bg-blue-50";
    case "completed":
      return "border-l-4 border-l-green-400 bg-green-50";
    default:
      return "border-l-4 border-l-gray-400 bg-gray-50";
  }
};

export const getHeaderDotColor = (heading: string) => {
  switch (heading.toLowerCase()) {
    case "todo":
      return "bg-orange-400";
    case "in-progress":
      return "bg-blue-400";
    case "completed":
      return "bg-green-400";
    default:
      return "bg-gray-400";
  }
};

export const getMoveButtonGradient = (heading: string) => {
  switch (heading.toLowerCase()) {
    case "todo":
      return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700";
    case "in-progress":
      return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
    default:
      return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";
  }
};