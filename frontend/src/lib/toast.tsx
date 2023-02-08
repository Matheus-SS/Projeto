import { toast } from 'react-hot-toast';

export function toastError(message: string): string {
  return toast.error(message);
}

export function toastSuccess(message: string): string {
  return toast.success(message);
}
