/**
 * AI Writing Suggestions Component (Mock)
 * Author: Mehdi
 */

import { Sparkles, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEditorStore } from '@/store/editorStore';
import { useState } from 'react';

export const AISuggestions = () => {
  const { aiSuggestions, generateSuggestions, clearSuggestions } = useEditorStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      generateSuggestions('current context');
      setIsLoading(false);
    }, 800);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline">AI Assist</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Writing Assistant
            </h4>
            {aiSuggestions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSuggestions}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {aiSuggestions.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Get AI-powered writing suggestions to improve your document.
              </p>
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isLoading ? 'Analyzing...' : 'Get Suggestions'}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm"
                >
                  <p className="text-foreground">{suggestion}</p>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full gap-2 mt-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh suggestions
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Powered by AI • Suggestions are simulated
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
