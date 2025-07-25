import { 
  Box, 
  Typography, 
  IconButton, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  onLimitChange 
}: PaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleLimitChange = (event: any) => {
    if (onLimitChange) {
      onLimitChange(event.target.value);
    }
  };

  const renderPageNumbers = () => {
    const pages: number[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalItems === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          sx={{ border: 1, borderColor: 'grey.300' }}
        >
          <ChevronLeft size={20} />
        </IconButton>
        
        <Typography variant="body2" color="text.secondary">
          Page {currentPage} of {totalPages}
        </Typography>
        
        <IconButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          sx={{ border: 1, borderColor: 'grey.300' }}
        >
          <ChevronRight size={20} />
        </IconButton>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            Showing <Box component="span" sx={{ fontWeight: 'medium' }}>{startItem}</Box> to{' '}
            <Box component="span" sx={{ fontWeight: 'medium' }}>{endItem}</Box> of{' '}
            <Box component="span" sx={{ fontWeight: 'medium' }}>{totalItems}</Box> results
          </Typography>
          
          {onLimitChange && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={itemsPerPage}
                label="Items per page"
                onChange={handleLimitChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            sx={{ 
              border: 1, 
              borderColor: 'grey.300',
              '&:disabled': { opacity: 0.5 }
            }}
          >
            <ChevronLeft size={20} />
          </IconButton>
          
          {renderPageNumbers().map((page) => (
            <IconButton
              key={page}
              onClick={() => onPageChange(page)}
              sx={{
                border: 1,
                borderColor: page === currentPage ? 'primary.main' : 'grey.300',
                bgcolor: page === currentPage ? 'primary.main' : 'white',
                color: page === currentPage ? 'white' : 'text.primary',
                minWidth: 40,
                '&:hover': {
                  bgcolor: page === currentPage ? 'primary.dark' : 'grey.50'
                }
              }}
            >
              {page}
            </IconButton>
          ))}
          
          <IconButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            sx={{ 
              border: 1, 
              borderColor: 'grey.300',
              '&:disabled': { opacity: 0.5 }
            }}
          >
            <ChevronRight size={20} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}