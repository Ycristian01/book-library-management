import { 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography, 
  IconButton, 
  Divider,
  Chip
} from '@mui/material';
import { Book, Eye, Trash2 } from 'lucide-react';
import type BookI from '../interfaces/book.interface';

interface BookItemProps {
  book: BookI;
  isLast?: boolean;
}

export default function BookItem({ book, isLast = false }: BookItemProps) {
  const handleViewDetails = () => {
    // TODO: Implement book detail
    console.log('View details for book:', book.id);
  };

  const handleDelete = () => {
    // TODO: Implement confirmation and delete
    console.log('Delete book:', book.id);
  };

  return (
    <>
      <ListItem
        sx={{ 
          py: 3,
          px: 3,
          '&:hover': {
            bgcolor: 'grey.50'
          },
          transition: 'background-color 0.2s ease'
        }}
      >
        <ListItemIcon sx={{ minWidth: 56 }}>
          <Book size={40} color="#1976d2" />
        </ListItemIcon>
        
        <ListItemText
          sx={{ flex: 1, mr: 2 }}
          primary={
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
              {book.title}
            </Typography>
          }
          secondary={
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                by <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {book.author}
                </Box>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Year: ${book.year}`} 
                  size="small" 
                  variant="outlined"
                  sx={{ bgcolor: 'grey.50' }}
                />
                <Chip 
                  label={`ISBN: ${book.isbn}`} 
                  size="small" 
                  variant="outlined"
                  sx={{ bgcolor: 'grey.50', fontFamily: 'monospace', fontSize: '0.75rem' }}
                />
              </Box>
            </Box>
          }
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={handleViewDetails}
            sx={{ 
              color: 'text.secondary',
              border: 1,
              borderColor: 'grey.300',
              '&:hover': {
                color: 'primary.main',
                borderColor: 'primary.main',
                bgcolor: 'primary.50'
              }
            }}
            title="View Details"
          >
            <Eye size={20} />
          </IconButton>
          
          <IconButton
            onClick={handleDelete}
            sx={{ 
              color: 'text.secondary',
              border: 1,
              borderColor: 'grey.300',
              '&:hover': {
                color: 'error.main',
                borderColor: 'error.main',
                bgcolor: 'error.50'
              }
            }}
            title="Delete Book"
          >
            <Trash2 size={20} />
          </IconButton>
        </Box>
      </ListItem>
      
      {!isLast && <Divider />}
    </>
  );
}