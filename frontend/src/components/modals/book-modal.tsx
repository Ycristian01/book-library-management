import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import type BookI from '../../interfaces/book.interface';

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book?: BookI | null;
  mode: 'edit' | 'add';
  onSave: (book: Omit<BookI, 'id'> | BookI) => Promise<void>;
}

export default function BookModal({ open, onClose, book, mode, onSave }: BookModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    isbn: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (book && mode === 'edit') {
      setFormData({
        title: book.title,
        author: book.author,
        year: book.year,
        isbn: book.isbn
      });
    } else if (mode === 'add') {
      setFormData({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        isbn: ''
      });
    }
    setErrors({});
  }, [book, mode, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.year || formData.year < 1000 || formData.year > new Date().getFullYear() + 10) {
      newErrors.year = 'Please enter a valid year';
    }
    
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (!/^\d{13}$/.test(formData.isbn.replace(/[-\s]/g, ''))) {
      newErrors.isbn = 'ISBN must be exactly 13 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    if (field === 'isbn' && typeof value === 'string') {
      const digits = value.replace(/\D/g, '');
      const limitedDigits = digits.slice(0, 13);
      
      setFormData(prev => ({
        ...prev,
        [field]: limitedDigits
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (mode === 'edit' && book) {
        await onSave({ ...formData, id: book.id });
      } else {
        await onSave(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Edit Book';
      case 'add':
        return 'Add New Book';
      default:
        return 'Book';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" component="span">
          {getTitle()}
        </Typography>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ color: 'grey.500' }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            disabled={false}
            fullWidth
            variant="outlined"
          />
          
          <TextField
            label="Author"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            error={!!errors.author}
            helperText={errors.author}
            disabled={false}
            fullWidth
            variant="outlined"
          />
          
          <TextField
            label="Year"
            type="number"
            value={formData.year}
            onChange={(e) => handleInputChange('year', parseInt(e.target.value) || 0)}
            error={!!errors.year}
            helperText={errors.year}
            disabled={false}
            fullWidth
            variant="outlined"
            inputProps={{ min: 1000, max: new Date().getFullYear() + 10 }}
          />
          
          <TextField
            label="ISBN"
            value={formData.isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
            error={!!errors.isbn}
            helperText={errors.isbn || 'Enter 13 digits (numbers only)'}
            disabled={false}
            fullWidth
            variant="outlined"
            inputProps={{ 
              maxLength: 13,
              pattern: '[0-9]*',
              inputMode: 'numeric'
            }}
            placeholder="9780000000000"
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          disabled={loading}
        >
          Cancel
        </Button>
        
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Saving...' : (mode === 'edit' ? 'Update' : 'Add Book')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}