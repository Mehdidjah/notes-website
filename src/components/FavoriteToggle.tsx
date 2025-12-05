/**
 * CollaboNotes - Favorite/Star Toggle (Notion-style)
 * Author: Mehdi
 */

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FavoriteToggleProps {
  isFavorite: boolean;
  onChange: (isFavorite: boolean) => void;
  showLabel?: boolean;
}

export const FavoriteToggle = ({ isFavorite, onChange, showLabel = false }: FavoriteToggleProps) => {
  const handleToggle = () => {
    const newValue = !isFavorite;
    onChange(newValue);
    toast.success(newValue ? 'Added to favorites' : 'Removed from favorites');
  };

  return (
    <Button
      variant="ghost"
      size={showLabel ? 'sm' : 'icon'}
      onClick={handleToggle}
      className="transition-smooth group"
    >
      <motion.div
        animate={isFavorite ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <Star
          className={`h-5 w-5 transition-colors ${
            isFavorite 
              ? 'fill-primary text-primary' 
              : 'text-muted-foreground group-hover:text-foreground'
          }`}
        />
      </motion.div>
      {showLabel && (
        <span className="ml-2">{isFavorite ? 'Favorited' : 'Add to favorites'}</span>
      )}
    </Button>
  );
};
