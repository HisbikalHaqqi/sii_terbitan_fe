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
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'


// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const FormUser = () => {

    const roleOptions = [
        { value: 'AUTHOR', label: 'AUTHOR' },
        { value: 'EDITOR 1', label: 'EDITOR 1' },
        { value: 'EDITOR 2', label: 'EDITOR 2' },
        { value: 'MANAJER PENERBIT', label: 'MANAJER PENERBIT' },
    ];


  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

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
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
        role: null,
        jenis_kelamin: null,
        pendidikan:""
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const onSubmit =  async () => {
    await submitData();

  }

  const submitData = async () => {
 
    const fields = [
        'full_name', 'email', 'password', 'phone_number', 'role','jenis_kelamin'
      ];

    const formData = fields.reduce((acc, field) => {
        acc[field] = getValues(field); 
        return acc;
      }, {});

    try {
        const reqBody =  JSON.stringify({
            "request": { 
                "full_name":formData.full_name,
                "email":formData.email,
                "password":formData.password,
                "phone_number":formData.phone_number,
                "role":formData.role,
                "gender":formData.jenis_kelamin,
            }
        })
        console.log(reqBody)


        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'admin/create',
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
    <Grid container spacing={5}>
        <Grid item xs={12}>
            <Typography variant='h4'>Form User</Typography>
            <Typography>Isi detail informasi akun pengguna</Typography>
        </Grid>
      
       
            <Grid item xs={12} sm={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardContent>
                            
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='full_name'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Nama Lengkap'
                                            placeholder='John'
                                            {...(errors.full_name && { error: true, helperText: 'Kolom ini harus diisi.' })}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type='email'
                                            fullWidth
                                            label='Email'
                                            placeholder='johndoe@gmail.com'
                                            {...(errors.email && { error: true, helperText: 'Kolom ini harus diisi.' })}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='password'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label='Password'
                                                type={isPasswordShown ? 'text' : 'password'}
                                                InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                    <IconButton
                                                        size='small'
                                                        edge='end'
                                                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                                                        onMouseDown={e => e.preventDefault()}
                                                    >
                                                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                                                    </IconButton>
                                                    </InputAdornment>
                                                )
                                                }}
                                            />
                                        )}
                                        {...(errors.password && { error: true, helperText: 'Kolom ini harus diisi.' })}
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
                                            placeholder='+62'
                                            {...(errors.email && { error: true, helperText: 'Kolom ini harus diisi.' })}
                                        />
                                        )}
                                    />
                                    </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel error={Boolean(errors.select)}>Role</InputLabel>
                                        <Controller
                                            name='role'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Select label='Role' {...field} error={Boolean(errors.select)}>
                                                    {roleOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                        {errors.role && <FormHelperText error>Kolom ini harus diisi.</FormHelperText>}
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
                                <Grid item xs={12} className='flex gap-4'>
                                    <Button variant='contained' type='submit'>
                                        Submit
                                    </Button>
                                    <Button variant='outlined' type='reset' onClick={() => reset()}>
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </Grid>
          
       
    
    </Grid>

  )
}

export default FormUser
