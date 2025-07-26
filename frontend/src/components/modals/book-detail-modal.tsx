import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Paper
} from '@mui/material';
import { X, Book, User, Calendar, Hash, Edit } from 'lucide-react';
import type BookI from '../../interfaces/book.interface';

interface BookDetailModalProps {
  open: boolean;
  onClose: () => void;
  book: BookI | null;
  onEdit?: (book: BookI) => void;
}

export default function BookDetailModal({ open, onClose, book, onEdit }: BookDetailModalProps) {
  if (!book) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(book);
    }
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 3,
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          p: 4,
          pb: 6
        }}>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{ 
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <X size={20} />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              p: 1.5, 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Book size={28} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Book Details
            </Typography>
          </Box>
        </Box>

        <Box sx={{ px: 4, pb: 4, mt: 2 }}>
          <Paper elevation={4} sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'white',
            border: '1px solid',
            borderColor: 'grey.100'
          }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2,
                lineHeight: 1.2
              }}
            >
              {book.title}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  bgcolor: 'primary.50', 
                  color: 'primary.main',
                  p: 1, 
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 40,
                  height: 40
                }}>
                  <User size={20} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Author
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {book.author}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  bgcolor: 'success.50', 
                  color: 'success.main',
                  p: 1, 
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 40,
                  height: 40
                }}>
                  <Calendar size={20} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Publication Year
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {book.year}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  bgcolor: 'warning.50', 
                  color: 'warning.main',
                  p: 1, 
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 40,
                  height: 40
                }}>
                  <Hash size={20} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    ISBN
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {book.isbn}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={`Published in ${book.year}`}
                color="primary"
                variant="outlined"
                size="medium"
              />
              <Chip 
                label={`By ${book.author}`}
                color="secondary"
                variant="outlined"
                size="medium"
              />
            </Box>
          </Paper>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 4, pb: 4, pt: 0 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          size="large"
        >
          Close
        </Button>
        
        {onEdit && (
          <Button 
            onClick={handleEdit}
            variant="contained"
            startIcon={<Edit size={18} />}
            size="large"
            sx={{ ml: 1 }}
          >
            Edit Book
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}