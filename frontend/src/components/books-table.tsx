import { useState, useEffect } from 'react';
import type BookI from '../interfaces/book.interface';
import BooksList from './books-list';
import Pagination from './pagination';
import DeleteConfirmationDialog from './delete-confirmation-dialog';
import { BookOpen, Plus } from 'lucide-react';
import axios from 'axios';
import { AppBar, Box, Button, Container, Toolbar, Typography, Snackbar, Alert } from '@mui/material';
import BookDetailModal from './modals/book-detail-modal';
import BookModal from './modals/book-modal';

type ModalMode = 'edit' | 'add';

export default function BooksTable() {
  const [books, setBooks] = useState<BookI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedBook, setSelectedBook] = useState<BookI | null>(null);
  
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [bookForDetail, setBookForDetail] = useState<BookI | null>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookI | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

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

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleViewBook = (book: BookI) => {
    setBookForDetail(book);
    setDetailModalOpen(true);
  };

  const handleEditBook = (book: BookI) => {
    setSelectedBook(book);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDeleteBook = (book: BookI) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleSaveBook = async (bookData: Omit<BookI, 'id'> | BookI) => {
    try {
      if (modalMode === 'add') {
        await axios.post(`${backendBaseUrl}/books`, bookData);
        showSnackbar('Book added successfully!');
      } else if (modalMode === 'edit' && 'id' in bookData) {
        await axios.put(`${backendBaseUrl}/books/${bookData.id}`, bookData);
        showSnackbar('Book updated successfully!');
      }
      await fetchBooks(page, limit);
    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred';
      
      if (axios.isAxiosError(err)) {
        const serverError = err.response?.data?.error || err.message;
        const status = err.response?.status;
        
        errorMessage = (() => {
          if (serverError.includes('duplicate key value violates unique constraint "unique_isbn"')) {
            return 'This ISBN already exists. Please use a different ISBN number.';
          }
          
          switch (status) {
            case 400: return 'Invalid book data. Please check all fields and try again.';
            case 404: return 'Book not found. It may have been deleted by another user.';
            default: return Number(status) >= 500 
              ? 'Server error. Please try again later.'
              : `Error saving book: ${err.message}`;
          }
        })();
      }
      
      showSnackbar(errorMessage, 'error');
      throw err;
    }
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    
    setDeleteLoading(true);
    try {
      await axios.delete(`${backendBaseUrl}/books/${bookToDelete.id}`);
      showSnackbar('Book deleted successfully!');
      setDeleteDialogOpen(false);
      setBookToDelete(null);
      await fetchBooks(page, limit);
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? `Error deleting book: ${err.response?.data || err.message}`
        : 'An unexpected error occurred';
      showSnackbar(errorMessage, 'error');
    } finally {
      setDeleteLoading(false);
    }
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
              onClick={handleAddBook}
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
          onView={handleViewBook}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
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

      <BookDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        book={bookForDetail}
        onEdit={(book) => {
          setDetailModalOpen(false);
          handleEditBook(book);
        }}
      />

      <BookModal
        open={modalOpen}
        onClose={handleModalClose}
        book={selectedBook}
        mode={modalMode}
        onSave={handleSaveBook}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        book={bookToDelete}
        loading={deleteLoading}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}