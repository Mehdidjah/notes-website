/**
 * CollaboNotes - Command Palette (Cmd+K)
 * Author: Mehdi
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FileText,
  Home,
  Plus,
  Search,
  Settings,
  Moon,
  Sun,
  Zap,
  Eye,
  Palette,
} from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useDocumentStore } from '@/store/documentStore';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { documents } = useDocumentStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Go to Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Go to Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {
            navigate('/dashboard');
            // Create new document would be triggered here
          })}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Document</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(toggleTheme)}>
            {theme === 'dark' ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Toggle Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Recent Documents">
          {documents.slice(0, 5).map((doc) => (
            <CommandItem
              key={doc.id}
              onSelect={() => runCommand(() => navigate(`/editor/${doc.id}`))}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
