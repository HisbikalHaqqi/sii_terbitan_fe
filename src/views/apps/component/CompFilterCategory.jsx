import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';

const CompFilterCategory = ({ value, onChange }) => {
  const pageSize = 10; 
  const [loading, setLoading] = useState(false);
  const [dataAPI, setDataAPI] = useState([]);
  const [globalFilter, setGlobalFilter] = useState({
    category_name: '',
    description: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const req = JSON.stringify({
        request: { page: 1, size: pageSize, filter: globalFilter }, 
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'category/all',
          requestBody: req,
        }),
      });

      const getResponse = await response.json();

      if (getResponse && getResponse.data) {
        setDataAPI(getResponse.data.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [globalFilter]);

  const handleStatusChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="status-select">Pilih Kategori</InputLabel>
      <Select
        labelId="status-select"
        value={value || ''}
        onChange={handleStatusChange}
        label="Pilih Kategori"
        placeholder='Pilih Kategori'
      >
        {loading ? (
          <MenuItem disabled>
            <Typography>Loading</Typography>
          </MenuItem>
        ) : (
          dataAPI.map((key) => (
            <MenuItem key={key.category_id} value={key.category_id}>
              {key.category_name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default CompFilterCategory;
