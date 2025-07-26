import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Paper
} from '@mui/material';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import type BookI from '../interfaces/book.interface';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  book: BookI | null;
  loading?: boolean;
}

export default function DeleteConfirmationDialog({ 
  open, 
  onClose, 
  onConfirm, 
  book, 
  loading = false 
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 3,
          maxHeight: '90vh',
          background: 'linear-gradient(135deg, #fef7f7 0%, #fef2f2 100%)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          color: 'white',
          p: 4,
          pb: 6
        }}>
          <IconButton 
            onClick={onClose}
            size="small"
            disabled={loading}
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
              <Trash2 size={28} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Delete Book
            </Typography>
          </Box>
        </Box>

        {/* Content Card */}
        <Box sx={{ px: 4, pb: 4, mt: 2 }}>
          <Paper elevation={4} sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'white',
            border: '1px solid',
            borderColor: 'grey.100'
          }}>
            {/* Warning Icon */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 3 
            }}>
              <Box sx={{ 
                bgcolor: 'error.50', 
                color: 'error.main',
                p: 2, 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64
              }}>
                <AlertTriangle size={32} />
              </Box>
            </Box>

            {/* Warning Message */}
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2,
                textAlign: 'center'
              }}
            >
              Are you sure you want to delete this book?
            </Typography>
            
            {/* Book Info */}
            {book && (
              <Box sx={{ 
                bgcolor: 'error.50', 
                border: '2px solid',
                borderColor: 'error.100',
                p: 3, 
                borderRadius: 2, 
                mb: 3,
                textAlign: 'center'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 1,
                    color: 'error.dark'
                  }}
                >
                  "{book.title}"
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published in {book.year} • ISBN: {book.isbn}
                </Typography>
              </Box>
            )}

            {/* Warning Text */}
            <Box sx={{ 
              bgcolor: 'warning.50',
              border: '1px solid',
              borderColor: 'warning.200',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="warning.dark" sx={{ fontWeight: 'medium' }}>
                ⚠️ This action cannot be undone
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 4, pb: 4, pt: 0 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          disabled={loading}
          size="large"
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          color="error"
          disabled={loading}
          size="large"
          sx={{ ml: 1 }}
        >
          {loading ? 'Deleting...' : 'Delete Book'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}