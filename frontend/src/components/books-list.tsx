import { Box, Paper, Typography, CircularProgress, Button, List } from '@mui/material';
import { Book } from 'lucide-react';
import type BookI from '../interfaces/book.interface';
import BookItem from './book-item';

interface BooksListProps {
  books: BookI[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export default function BooksList({ books, loading, error, onRefresh }: BooksListProps) {
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading books...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
        <Box sx={{ color: 'error.main', mb: 2 }}>
          <Book size={48} />
        </Box>
        <Typography variant="h6" color="error.main" gutterBottom>
          Error Loading Books
        </Typography>
        <Typography variant="body2" color="error.main" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onRefresh}
        >
          Try Again
        </Button>
      </Paper>
    );
  }

  if (books.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
        <Box sx={{ color: 'text.disabled', mb: 2 }}>
          <Book size={48} />
        </Box>
        <Typography variant="h6" color="text.primary" gutterBottom>
          No Books Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          There are no books in the library yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ overflow: 'hidden' }}>
      <List sx={{ py: 0 }}>
        {books.map((book, index) => (
          <BookItem 
            key={book.id} 
            book={book} 
            isLast={index === books.length - 1}
          />
        ))}
      </List>
    </Paper>
  );
}