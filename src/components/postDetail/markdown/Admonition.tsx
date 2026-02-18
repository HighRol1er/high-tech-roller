import type { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export type AdmonitionType = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface AdmonitionProps {
  type: AdmonitionType;
  children: ReactNode;
}

const typeConfig: Record<
  AdmonitionType,
  {
    icon: React.ComponentType<{ className?: string }>;
    borderColor: string;
    iconColor: string;
    bgColor: string; // 배경색 추가
  }
> = {
  info: {
    icon: Info,
    borderColor: 'border-blue-500',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-yellow-500',
    iconColor: 'text-yellow-600 dark:text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
  },
  success: {
    icon: CheckCircle,
    borderColor: 'border-green-500',
    iconColor: 'text-green-600 dark:text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
  },
  error: {
    icon: XCircle,
    borderColor: 'border-red-500',
    iconColor: 'text-red-600 dark:text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
  },
  tip: {
    icon: Lightbulb,
    borderColor: 'border-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
  },
};

export const Admonition = ({ type, children }: AdmonitionProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 my-4 flex gap-3`}>
      <div className={`${config.iconColor} shrink-0 mt-0.5`}>
        <Icon className='w-5 h-5' />
      </div>
      <div className='flex-1 text-foreground [&>p]:mb-0'>{children}</div>
    </div>
  );
};
