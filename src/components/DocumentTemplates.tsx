/**
 * Document Templates Component
 * Author: Mehdi
 */

import { FileText, Briefcase, BookOpen, ListChecks, Lightbulb, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const templates = [
  {
    id: 'blank',
    icon: FileText,
    name: 'Blank Document',
    description: 'Start from scratch',
    content: '',
  },
  {
    id: 'meeting',
    icon: Briefcase,
    name: 'Meeting Notes',
    description: 'Structured meeting template',
    content: `# Meeting Notes

**Date:** ${new Date().toLocaleDateString()}
**Attendees:** 

---

## Agenda

1. 
2. 
3. 

## Discussion Points

### Topic 1


### Topic 2


## Action Items

- [ ] 
- [ ] 

## Next Steps

`,
  },
  {
    id: 'blog',
    icon: BookOpen,
    name: 'Blog Post',
    description: 'Article with intro, body, conclusion',
    content: `# Article Title

*By Author Name • ${new Date().toLocaleDateString()}*

---

## Introduction

Start with a compelling hook...

## Main Content

### Section 1

Your first main point...

### Section 2

Your second main point...

## Conclusion

Summarize your key takeaways...

---

*Thanks for reading!*
`,
  },
  {
    id: 'todo',
    icon: ListChecks,
    name: 'Task List',
    description: 'Simple to-do list',
    content: `# Tasks for ${new Date().toLocaleDateString()}

## High Priority
- [ ] 

## Medium Priority
- [ ] 

## Low Priority
- [ ] 

## Completed
- [x] 

`,
  },
  {
    id: 'brainstorm',
    icon: Lightbulb,
    name: 'Brainstorm',
    description: 'Ideation and mind mapping',
    content: `# Brainstorm Session

**Topic:** 
**Date:** ${new Date().toLocaleDateString()}

---

## Core Ideas

1. 

## Questions to Explore

- 

## Connections & Patterns

- 

## Next Actions

- 

`,
  },
  {
    id: 'email',
    icon: Mail,
    name: 'Email Draft',
    description: 'Professional email template',
    content: `**To:** 
**Subject:** 

---

Hi [Name],

Hope this message finds you well.

[Body of the email]

Best regards,
[Your name]
`,
  },
];

interface DocumentTemplatesProps {
  onSelectTemplate: (content: string) => void;
}

export const DocumentTemplates = ({ onSelectTemplate }: DocumentTemplatesProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose a Template</DialogTitle>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.content)}
              className="group p-4 text-left rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-smooth">
                <template.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
