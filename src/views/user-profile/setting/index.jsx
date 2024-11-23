'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import ConvertDate from '@/helpers/ConvertDate'




const Setting =  (getEmail) => {

    const PendidikanOptions = [
        { value: 'SD', label: 'SD / SEDERAJAT' },
        { value: 'SMP', label: 'SMP / SEDERAJAT' },
        { value: 'SMA', label: 'SMA / SEDERAJAT' },
        { value: 'S1', label: 'S1' },
        { value: 'S2', label: 'S2' },
        { value: 'S3', label: 'S3' }
    ];

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
        fullname: '',
        dob: null,
        tempat_lahir: '',
        alamat: '',
        pendidikan: '',
        jenis_kelamin: null,
        biografi: '',
        pengalaman: '',
        penghargaan: '',
        country: '',
        city:''
    }
  })

  const onSubmit =  async () => {
    await submitData();

  }

  const submitData = async () => {
 
    const fields = [
        'fullname', 'dob', 'tempat_lahir', 'alamat', 'pendidikan',
        'jenis_kelamin', 'biografi', 'pengalaman', 'penghargaan',
        'email', 'country', 'city', 'phone_number, last_education'
      ];

      const formData = fields.reduce((acc, field) => {
        acc[field] = getValues(field); 
        return acc;
      }, {});

    try {
        const parseDate = ConvertDate.ConvertDateSql(formData.dob)
    
        const reqBody =  JSON.stringify({
            "request": { 
            "fullname":formData.fullname,
            "date_of_birth":parseDate,
            "address":formData.alamat,
            "education":formData.pendidikan,
            "gender":formData.jenis_kelamin,
            "biography":formData.biografi,
            "experience":formData.pengalaman,
            "achievement":formData.penghargaan,
            "city":formData.city,
            "country":formData.coutry,
            "phone_number":formData.phone_number,
            "last_education":formData.last_education
        }
    })


        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'update-user',
                requestBody: reqBody
            })
        });

        const getResponse = await response.json();
        if (getResponse.status == 200) {
            fields.forEach(field => {
                setValue(field, ""); 
            });

            toast.success("Data berhasil diperbaharui!");

        } else {
            toast.error("Invalid Data");
        }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return ( 
    <Grid container spacing={6}>
        <Grid item lg={12} md={12} xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={6}>
                
                    <Grid item lg={12} md={12} xs={12}>
                        <Card>
                            <CardHeader title='Info Pribadi' />
                            <CardContent>
                              
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='fullname'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Nama Lengkap'
                                            placeholder=''
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                <i className='ri-user-3-line' />
                                                </InputAdornment>
                                            )
                                            }}
                                            {...(errors.fullname && { error: true, helperText: 'Kolom ini harus diisi' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='dob'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                        <AppReactDatepicker
                                            selected={value}
                                            showYearDropdown
                                            showMonthDropdown
                                            onChange={onChange}
                                            placeholderText='MM/DD/YYYY'
                                            customInput={
                                            <TextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label='Tanggal Lahir'
                                                {...(errors.dob && { error: true, helperText: 'Kolom harus diisi.' })}
                                            />
                                            }
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='tempat_lahir'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Tempat Lahir'
                                            placeholder=''
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                <i className='ri-home-gear-line' />
                                                </InputAdornment>
                                            )
                                            }}
                                            {...(errors.tempat_lahir && { error: true, helperText: 'Kolom harus diisi.' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='alamat'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Alamat Lengkap'
                                            placeholder=''
                                            InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                <i className='ri-home-office-line' />
                                                </InputAdornment>
                                            )
                                            }}
                                            {...(errors.alamat && { error: true, helperText: 'Kolom harus diisi.' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name='negara'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Asal Negara'
                                                placeholder=''
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                    <i className='ri-home-office-line' />
                                                    </InputAdornment>
                                                )
                                                }}
                                                {...(errors.country && { error: true, helperText: 'Kolom harus diisi.' })}
                                            />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name='phone_number'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='No Telepon'
                                                placeholder=''
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                    <i className='ri-home-office-line' />
                                                    </InputAdornment>
                                                )
                                                }}
                                                {...(errors.phone_number && { error: true, helperText: 'Kolom harus diisi.' })}
                                            />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name='city'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Kota Domisili'
                                                placeholder=''
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                    <i className='ri-home-office-line' />
                                                    </InputAdornment>
                                                )
                                                }}
                                                {...(errors.city && { error: true, helperText: 'Kolom harus diisi.' })}
                                            />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel error={Boolean(errors.select)}>Pendidikan Terakhir</InputLabel>
                                            <Controller
                                                name='last_education'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select label='Pendidikan Terakhir' {...field} error={Boolean(errors.select)}>
                                                        {PendidikanOptions.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                            {errors.last_education && <FormHelperText error>Kolom ini harus diisi.</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl error={Boolean(errors.radio)}>
                                            <FormLabel>Jenis Kelamin</FormLabel>
                                            <Controller
                                            name='jenis_kelamin'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <RadioGroup row {...field} name='radio-buttons-group'>
                                                <FormControlLabel value='FM' control={<Radio />} label='Female' />
                                                <FormControlLabel value='M' control={<Radio />} label='Male' />
                                                </RadioGroup>
                                            )}
                                            />
                                            {errors.jenis_kelamin && <FormHelperText error>Kolom ini harus diisi.</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <Card>
                            <CardHeader title='Biografi dan Latar Belakang' />
                            <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Controller
                                        name='biografi'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            rows={4}
                                            fullWidth
                                            multiline
                                            label='Bio'
                                            {...(errors.biografi && { error: true, helperText: 'Kolom harus diisi.' })}
                                        />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        name='pengalaman'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            rows={4}
                                            fullWidth
                                            multiline
                                            label='Pengalaman Pekerjaan' 
                                            {...(errors.pengalaman && { error: true, helperText: 'Kolom harus diisi.' })}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name='penghargaan'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            rows={4}
                                            fullWidth
                                            multiline
                                            label='Penghargaan Pencapaian' 
                                            {...(errors.penghargaan && { error: true, helperText: 'Kolom harus diisi.' })}
                                        />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} className='flex gap-4'>
                        <Button variant='contained' type='submit'>
                        Submit
                        </Button>
                        <Button variant='outlined' type='reset' onClick={() => reset()}>
                        Reset
                        </Button>
                    </Grid>
                
                </Grid>
            </form>
        </Grid>
    </Grid>
    
  )
}

export default Setting
