/**
 * CollaboNotes - Document Cover Image (Notion-style)
 * Author: Mehdi
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, Palette, Upload, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

const GRADIENT_COVERS = [
  'linear-gradient(135deg, hsl(36 67% 62%) 0%, hsl(28 80% 52%) 100%)',
  'linear-gradient(135deg, hsl(200 80% 60%) 0%, hsl(220 90% 50%) 100%)',
  'linear-gradient(135deg, hsl(280 70% 60%) 0%, hsl(320 80% 55%) 100%)',
  'linear-gradient(135deg, hsl(140 60% 50%) 0%, hsl(180 70% 45%) 100%)',
  'linear-gradient(135deg, hsl(350 80% 60%) 0%, hsl(20 85% 55%) 100%)',
  'linear-gradient(135deg, hsl(40 90% 60%) 0%, hsl(60 85% 55%) 100%)',
];

const SOLID_COLORS = [
  'hsl(36 67% 62%)',
  'hsl(220 90% 55%)',
  'hsl(280 70% 55%)',
  'hsl(140 60% 45%)',
  'hsl(350 80% 55%)',
  'hsl(0 0% 20%)',
];

interface CoverImageProps {
  cover?: string | null;
  onChange?: (cover: string | null) => void;
}

export const CoverImage = ({ cover, onChange }: CoverImageProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSelectGradient = (gradient: string) => {
    onChange?.(gradient);
  };

  const handleSelectColor = (color: string) => {
    onChange?.(color);
  };

  const handleImageUrl = () => {
    if (imageUrl.trim()) {
      onChange?.(`url(${imageUrl})`);
      setImageUrl('');
    }
  };

  const handleRemove = () => {
    onChange?.(null);
  };

  if (!cover) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Image className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Gradients</p>
              <div className="grid grid-cols-3 gap-2">
                {GRADIENT_COVERS.map((gradient, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectGradient(gradient)}
                    className="h-12 rounded-lg transition-smooth hover:scale-105 hover:shadow-medium"
                    style={{ background: gradient }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Solid colors</p>
              <div className="grid grid-cols-6 gap-2">
                {SOLID_COLORS.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectColor(color)}
                    className="h-8 rounded-lg transition-smooth hover:scale-110"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Image URL</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleImageUrl}>
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <motion.div
      className="relative h-48 w-full rounded-t-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ background: cover.startsWith('url') ? cover : cover, backgroundSize: 'cover' }}
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/20 flex items-center justify-center gap-2"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="secondary" className="glass-effect">
                  <Palette className="h-4 w-4 mr-2" />
                  Change
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Gradients</p>
                    <div className="grid grid-cols-3 gap-2">
                      {GRADIENT_COVERS.map((gradient, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectGradient(gradient)}
                          className="h-12 rounded-lg transition-smooth hover:scale-105"
                          style={{ background: gradient }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Solid colors</p>
                    <div className="grid grid-cols-6 gap-2">
                      {SOLID_COLORS.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectColor(color)}
                          className="h-8 rounded-lg transition-smooth hover:scale-110"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button size="sm" variant="secondary" className="glass-effect" onClick={handleRemove}>
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
