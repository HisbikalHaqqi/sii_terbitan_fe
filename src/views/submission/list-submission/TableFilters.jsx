import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

// Component Imports
import CompFilterCategory from '@/views/apps/component/CompFilterCategory';
import CompFilterStatus from '@/views/apps/component/CompFilterStatus';

const TableFilters = ({ setData, tableData, page, pageSize, setTotalRows, activeFilters, setActiveFilters }) => {
  const [filters, setFilters] = useState(activeFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const handleChangeCategory = (newCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: newCategory, 
    }));
  };

  const handleChangeStatus = (newStatus) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: newStatus, 
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const fetchFilteredData = async (currentPage = page) => {
    setLoading(true);
    setError(null);

    try {
      const req = JSON.stringify({
        request: {
          page: currentPage + 1, 
          size: pageSize,
          filter: {
            title: filters.title,
            publish_date: filters.publish_date,
            paper_id: filters.paper_id,
            status: parseInt(filters.status),
            category: parseInt(filters.category),
          },
        },
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'paper/list',
          requestBody: req,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if (data && data.data) {
        setData(data.data.data);
        setTotalRows(data.data.total);
      }
    } catch (err) {
      setError('Error loading data, please try again later');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveFilters(filters); 
    fetchFilteredData(0); 
  };

  const handleReset = () => {
    const emptyFilters = {
      title: '',
      publish_date: '',
      status: 0,
      paper_id: 0,
      category: 0,
    };
    setFilters(emptyFilters);  
    setActiveFilters(emptyFilters); 
    fetchFilteredData(0); 
  };

  useEffect(() => {
  
    if (Object.values(activeFilters).some((value) => value !== '')) {
      fetchFilteredData(page);
    }
  }, [page, pageSize, activeFilters]);

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Naskah"
              type="text"
              name="title"
              value={filters.title}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <CompFilterCategory value={filters.category} onChange={handleChangeCategory} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CompFilterStatus value={filters.status} onChange={handleChangeStatus} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-1.5">
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Pencarian'}
              </Button>

              <Button
                color="error"
                variant="contained"
                onClick={handleReset}
              >
                Clear
              </Button>
              <Button
                color="secondary"
                variant="outlined"
              >
                Export
              </Button>
            </div>
            {error && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {error}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableFilters;
