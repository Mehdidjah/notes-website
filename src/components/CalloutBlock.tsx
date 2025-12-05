/**
 * CollaboNotes - Callout Block Component (Notion-style)
 * Author: Mehdi
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Flame,
  Star,
  Heart,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip' | 'fire' | 'star' | 'heart';

interface CalloutBlockProps {
  type?: CalloutType;
  children: React.ReactNode;
  editable?: boolean;
  onChange?: (type: CalloutType) => void;
}

const CALLOUT_STYLES: Record<CalloutType, { icon: React.ReactNode; bg: string; border: string; iconColor: string }> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-500',
  },
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500',
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5" />,
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-500',
  },
  fire: {
    icon: <Flame className="h-5 w-5" />,
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-500',
  },
  star: {
    icon: <Star className="h-5 w-5" />,
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-500',
  },
  heart: {
    icon: <Heart className="h-5 w-5" />,
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-200 dark:border-pink-800',
    iconColor: 'text-pink-500',
  },
};

const CALLOUT_OPTIONS = Object.keys(CALLOUT_STYLES) as CalloutType[];

export const CalloutBlock = ({ type = 'info', children, editable = false, onChange }: CalloutBlockProps) => {
  const [currentType, setCurrentType] = useState<CalloutType>(type);
  const style = CALLOUT_STYLES[currentType];

  const handleTypeChange = (newType: CalloutType) => {
    setCurrentType(newType);
    onChange?.(newType);
  };

  const iconElement = (
    <div className={`p-1 ${style.iconColor}`}>
      {style.icon}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 p-4 rounded-xl border ${style.bg} ${style.border} transition-smooth`}
    >
      {editable ? (
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:scale-110 transition-transform cursor-pointer">
              {iconElement}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="grid grid-cols-4 gap-1">
              {CALLOUT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleTypeChange(option)}
                  className={`p-2 rounded-lg transition-smooth hover:bg-muted
                    ${currentType === option ? 'bg-primary/10 ring-1 ring-primary' : ''}`}
                >
                  <span className={CALLOUT_STYLES[option].iconColor}>
                    {CALLOUT_STYLES[option].icon}
                  </span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        iconElement
      )}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </motion.div>
  );
};
