import { toast } from 'sonner';

export const ErrToast = (msg: string) => {
  toast.error(msg, {
    style: {
      border: '1px solid #ef4444',
      color: '#ef4444',
    },
  });
};

export const SuccessToast = (msg: string) => {
  toast.success(msg, {
    style: {
      border: '1px solid #22c55e',
      color: '#22c55e',
    },
  });
};
