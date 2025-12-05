/**
 * Export Options Component
 * Author: Mehdi
 */

import { Download, FileText, Code, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ExportOptionsProps {
  documentTitle: string;
  content: string;
}

export const ExportOptions = ({ documentTitle, content }: ExportOptionsProps) => {
  const downloadFile = (data: string, filename: string, type: string) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsMarkdown = () => {
    downloadFile(content, `${documentTitle}.md`, 'text/markdown');
    toast.success('Exported as Markdown');
  };

  const exportAsText = () => {
    downloadFile(content, `${documentTitle}.txt`, 'text/plain');
    toast.success('Exported as Plain Text');
  };

  const exportAsHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${documentTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    h2 { font-size: 2rem; margin-top: 2rem; }
    p { margin: 1rem 0; }
  </style>
</head>
<body>
  <h1>${documentTitle}</h1>
  <div>${content.replace(/\n/g, '<br>')}</div>
</body>
</html>`;
    downloadFile(html, `${documentTitle}.html`, 'text/html');
    toast.success('Exported as HTML');
  };

  const exportAsJSON = () => {
    const json = JSON.stringify({
      title: documentTitle,
      content,
      exportedAt: new Date().toISOString(),
    }, null, 2);
    downloadFile(json, `${documentTitle}.json`, 'application/json');
    toast.success('Exported as JSON');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export Document</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exportAsMarkdown}>
          <FileText className="h-4 w-4 mr-2" />
          Markdown (.md)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsText}>
          <FileText className="h-4 w-4 mr-2" />
          Plain Text (.txt)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsHTML}>
          <Code className="h-4 w-4 mr-2" />
          HTML (.html)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsJSON}>
          <FileJson className="h-4 w-4 mr-2" />
          JSON (.json)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyToClipboard}>
          Copy to Clipboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
