import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { Grid, IconButton, CircularProgress, FormHelperText, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';

const CompApproval = ({ url, control, errors }) => {
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
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${inputValue}`);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      return data.map((user) => ({
        label: user.name,
        value: user.id,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error loading data, please try again later');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Handle the change in each AsyncSelect
  const handleChange = (selectedOption, selectIndex) => {
    if (
      selectedOption &&
      selectedOptions.some(
        (option, index) => option?.value === selectedOption.value && index !== selectIndex
      )
    ) {
      setError('User review tidak boleh sama');
      return;
    }

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[selectIndex] = selectedOption;
    setSelectedOptions(newSelectedOptions);
    setError(null);
  };

  // Clone a new select component
  const handleCloneSelect = () => {
    setSelectCount(selectCount + 1);
    setSelectedOptions([...selectedOptions, null]);
  };

  // Delete a select component
  const handleDeleteSelect = (selectIndex) => {
    if (selectCount <= 1) return;
    const newSelectCount = selectCount - 1;
    const newSelectedOptions = selectedOptions.filter((_, index) => index !== selectIndex);
    setSelectCount(newSelectCount);
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div>
      {[...Array(selectCount)].map((_, index) => (
        <Grid container spacing={5} key={index}>
          <Grid item xs={12} sm={10} padding={2}>
            <FormControl fullWidth error={!!errors?.approval?.[index]}>
              <Controller
                name={`approval[${index}]`} // Dynamic name for each select
                control={control}
                rules={{ required: 'Kolom harus diisi.' }} // Add validation rules here
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    styles={customStyles}
                    cacheOptions
                    loadOptions={fetchOptions}
                    defaultOptions
                    onChange={(selectedOption) => handleChange(selectedOption, index)}
                    value={selectedOptions[index] || null}
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
              {/* Show error message based on react-hook-form validation */}
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
            <IconButton onClick={() => handleCloneSelect(index)} size="large">
              <i className="ri-user-add-line text-textSecondary" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default CompApproval;
