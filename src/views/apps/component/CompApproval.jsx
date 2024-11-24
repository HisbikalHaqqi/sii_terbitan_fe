import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { Grid, IconButton, CircularProgress, FormHelperText, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import EncryptData from '@/helpers/EncryptData';

const CompApproval = ({ control, errors, setValue }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectCount, setSelectCount] = useState(1);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
    menu: (base) => ({
      ...base,
      maxHeight: 300,
      zIndex: 9999,
    }),
    option: (base) => ({
      ...base,
      height: 40,
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const fetchOptions = async (inputValue) => {
    if (!inputValue) return [];

    setLoading(true);
    setError(null);

    try {
      const req = JSON.stringify({
        request: { "page": 1, "size": 10, "filter": { "name": inputValue } }
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: 'admin/list-user',
          requestBody: req
        })
      });

      if (!response) throw new Error('Failed to fetch data');
      const data = await response.json();
      const users = data.data.data;

      return users.map(user => ({
        label: `${user.full_name} (ROLE : ${user.role})`,
        value: EncryptData(user.id + "|" + user.full_name + "|"+user.role),
      }));
    } catch (error) {
      setError('Error loading data, please try again later');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (selectedOption, selectIndex) => {
    if (!selectedOption) return;

    if (selectedOptions.some((option, index) => option?.value === selectedOption.value && index !== selectIndex)) {
      setError('User review tidak boleh sama');
      return;
    }

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[selectIndex] = selectedOption;
    setSelectedOptions(newSelectedOptions);
    
    setValue(`approval[${selectIndex}]`, selectedOption);

    setError(null);
  };

  const handleCloneSelect = () => {
    setSelectCount(selectCount + 1);
    setSelectedOptions([...selectedOptions, null]);
  };

  const handleDeleteSelect = (selectIndex) => {
    if (selectCount <= 1) return;
    const newSelectCount = selectCount - 1;
    const newSelectedOptions = selectedOptions.filter((_, index) => index !== selectIndex);
    setSelectCount(newSelectCount);
    setSelectedOptions(newSelectedOptions);
    
    setValue(`approval[${selectIndex}]`, null);
  };

  return (
    <div style={{zIndex:1000}}>

      {[...Array(selectCount)].map((_, index) => (
      
        <Grid container spacing={5} key={index}>
          <Grid item xs={12} sm={10} padding={2}>
            <FormControl fullWidth error={!!errors?.approval?.[index]}>
              <Controller
                name={`approval[${index}]`} 
                control={control}
                rules={{ required: 'Kolom harus diisi.' }}
                render={({ field }) => (
                  <AsyncSelect
                    id={index}
                    {...field}
                    styles={customStyles}
                    cacheOptions
                    loadOptions={fetchOptions}
                    defaultOptions
                    onChange={(selectedOption) => handleChange(selectedOption, index)}
                    value={selectedOptions[index] || null}  // Ensure the right value is selected
                    isClearable
                    placeholder="Cari User Reviewer"
                    noOptionsMessage={() => 'Data tidak ditemukan'}
                    isLoading={loading}
                    components={{
                      LoadingIndicator: () => <CircularProgress size={24} />,
                    }}
                  />
                )}
              />
              {errors?.approval?.[index] && (
                <FormHelperText>{errors.approval[index]?.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={2}>
            {index !== 0 && (
              <IconButton onClick={() => handleDeleteSelect(index)} size="large">
                <i className="ri-delete-bin-7-line text-textSecondary" />
              </IconButton>
            )}
            <IconButton onClick={() => handleCloneSelect()} size="large">
              <i className="ri-user-add-line text-textSecondary" />
            </IconButton>
          </Grid>
        </Grid>
      
      ))}
    </div>
  );
};

export default CompApproval;
