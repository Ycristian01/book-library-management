import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Chip,
  Divider,
  Tooltip
} from '@mui/material';
import { Eye, Edit, Trash2 } from 'lucide-react';
import type BookI from '../interfaces/book.interface';

interface BookItemProps {
  book: BookI;
  isLast: boolean;
  onView: (book: BookI) => void;
  onEdit: (book: BookI) => void;
  onDelete: (book: BookI) => void;
}

export default function BookItem({ book, isLast, onView, onEdit, onDelete }: BookItemProps) {
  return (
    <>
      <ListItem
        sx={{
          py: 2.5,
          px: 3,
          '&:hover': {
            bgcolor: 'grey.50'
          }
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                {book.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                <Tooltip title="View Details">
                  <IconButton
                    size="small"
                    onClick={() => onView(book)}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.50' }
                    }}
                  >
                    <Eye size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Book">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(book)}
                    sx={{
                      color: 'warning.main',
                      '&:hover': { bgcolor: 'warning.50' }
                    }}
                  >
                    <Edit size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Book">
                  <IconButton
                    size="small"
                    onClick={() => onDelete(book)}
                    sx={{
                      color: 'error.main',
                      '&:hover': { bgcolor: 'error.50' }
                    }}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          }
          secondary={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" component="span">
                by {book.author}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip
                  label={book.year}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
                <Chip
                  label={`ISBN: ${book.isbn}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              </Box>
            </Box>
          }
          secondaryTypographyProps={{ component: 'div' }}
        />
      </ListItem>
      {!isLast && <Divider />}
    </>
  );
}