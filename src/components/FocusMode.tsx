/**
 * CollaboNotes - Focus Mode Overlay
 * Author: Mehdi
 */

import { useState, useEffect } from 'react';
import { Focus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FocusModeProps {
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const FocusMode = ({ isActive, onToggle, children }: FocusModeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isVisible && !isActive) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="hover:bg-primary/10"
        style={{ transition: 'background 0.2s ease-out' }}
      >
        <Focus className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Focus Mode Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        
        {/* Exit button */}
        <div
          className={`fixed top-6 right-6 z-50 transition-all duration-300 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Exit Focus
          </Button>
        </div>

        {/* Content area */}
        <div
          className={`h-full flex items-center justify-center p-8 transition-all duration-400 delay-100 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-98'}`}
        >
          <div className="w-full max-w-3xl">
            {children}
          </div>
        </div>

        {/* Breathing animation indicator */}
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground transition-opacity duration-300 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-2 h-2 rounded-full bg-primary pulse-dot" />
          <span className="text-xs">Focus Mode</span>
        </div>
      </div>
    </>
  );
};
