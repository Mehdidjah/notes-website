/**
 * CollaboNotes - Premium Dashboard
 * Author: Mehdi
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Clock, Trash2, Sparkles, MoreVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/shared/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useDocumentStore } from '@/store/documentStore';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { documents, loadDocuments, createDocument, deleteDocument } = useDocumentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadDocuments();
    // Trigger animations after mount
    requestAnimationFrame(() => setIsLoaded(true));
  }, [isAuthenticated, navigate, loadDocuments]);

  const handleCreateDocument = () => {
    const newDoc = createDocument('Untitled Document');
    toast.success('Document created!');
    navigate(`/editor/${newDoc.id}`);
  };

  const handleOpenDocument = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleDeleteDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteDocument(id);
    toast.success('Document deleted');
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 pt-24 pb-12 max-w-7xl">
        {/* Header */}
        <div 
          className={`mb-12 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Your Workspace</h1>
          </div>
          <p className="text-xl text-muted-foreground">Create beautiful documents. Collaborate in real-time.</p>
        </div>

        {/* Search & Actions */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-500 ease-out delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search your documents..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="pl-12 h-14 text-base border-border/50 bg-card shadow-soft focus:shadow-medium transition-shadow" 
            />
          </div>
          <Button 
            size="lg" 
            onClick={handleCreateDocument} 
            className="gradient-hero text-white h-14 px-8 shadow-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-semibold"
            style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', transform: 'translateZ(0)' }}
          >
            <Plus className="mr-2 h-5 w-5" />
            New Document
          </Button>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc, index) => (
              <div 
                key={doc.id} 
                onClick={() => handleOpenDocument(doc.id)} 
                className={`group relative p-6 rounded-2xl border border-border/50 bg-card cursor-pointer transition-all duration-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ 
                  transitionDelay: `${150 + index * 50}ms`,
                  transform: 'translateZ(0)',
                  boxShadow: 'var(--shadow-soft)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) translateZ(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-large)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateZ(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                }}
              >
                <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center shadow-medium transition-transform duration-300 group-hover:scale-110"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="animate-scale-in">
                        <DropdownMenuItem onClick={(e) => handleDeleteDocument(doc.id, e)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className={`text-center py-24 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transform: 'translateZ(0)' }}
          >
            <div className="w-24 h-24 rounded-2xl gradient-hero mx-auto mb-8 flex items-center justify-center shadow-glow">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-3 text-foreground">{searchQuery ? 'No documents found' : 'Start creating'}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">{searchQuery ? 'Try adjusting your search' : 'Create your first document and experience real-time collaboration'}</p>
            {!searchQuery && (
              <Button 
                onClick={handleCreateDocument} 
                size="lg" 
                className="gradient-hero text-white shadow-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] h-14 px-10 font-semibold"
                style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', transform: 'translateZ(0)' }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Document
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
