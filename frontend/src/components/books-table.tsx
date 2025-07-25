import { useState, useEffect } from 'react';
import type BookI from '../interfaces/book.interface';
import BooksList from './books-list';
import Pagination from './pagination';
import { BookOpen, Plus } from 'lucide-react';
import axios from 'axios';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';

export default function BooksTable() {
  const [books, setBooks] = useState<BookI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchBooks = async (currentPage: number = page, currentLimit: number = limit) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${backendBaseUrl}/books`, {
        params: {
          page: currentPage,
          limit: currentLimit,
        }
      });
      
      if (response.data.data) {
        setBooks(response.data.data);
        setTotalCount(response.data.total || response.data.data.length);
        setPage(response.data.page || currentPage);
      } else {
        setBooks([]);
        setTotalCount(0);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(`Error loading books: ${err.message}`);
      } else {
        setError('An unexpected error occurred');
      }
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / limit)) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" elevation={2} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <BookOpen size={32} color="#1976d2" />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Library Management
            </Typography>
          </Box>
          <Box sx={{ ml: 4 }}>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              sx={{ 
                textTransform: 'none',
                px: 3,
                py: 1
              }}
            >
              Add Book
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <BooksList 
          books={books}
          loading={loading}
          error={error}
          onRefresh={() => fetchBooks(page, limit)}
        />

        {!loading && !error && (
          <Box sx={{ mt: 3 }}>
            <Pagination
              currentPage={page}
              totalItems={totalCount}
              itemsPerPage={limit}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}