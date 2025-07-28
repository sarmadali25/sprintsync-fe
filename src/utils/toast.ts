import Swal from 'sweetalert2';

// Toast configuration types
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