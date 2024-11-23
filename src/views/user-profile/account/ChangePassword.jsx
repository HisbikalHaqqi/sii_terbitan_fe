'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

const ChangePassword = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  //hooks 
  const {
    control,
    handleSubmit,
    formState:{errors},
    getValues,
    setValue
  } = useForm({
    defaultValues:{
      password:"",
      confirm_password:""
    }
  })

  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

  const onSubmit = async () => {
    const { password, confirm_password } = getValues(); 

    if (!regex.test(password) || !regex.test(confirm_password)){
      toast.error("Password tidak memenuhi syarat");
      return
    }

    if (password !== confirm_password) {
      toast.error("Password tidak cocok");
      return;
    }
    

    await fetchData(password, confirm_password);
  };

  const fetchData = async (password, confirm_password) => {
    try {
      const reqBody =  JSON.stringify({
        "request": { 
          "password":password,
          "confirm_password":confirm_password}
      })

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'update-password',
          requestBody: reqBody
        })
      });

      const getResponse = await response.json();


      if (getResponse.status == 200) {
        setValue("password", "");
        setValue("confirm_password", "");
        toast.success("Password berhasil diperbaharui!");
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent className='flex flex-col gap-4'>
        <Alert icon={false} severity='warning' onClose={() => {}}>
          <AlertTitle>Password Rule</AlertTitle>
          Minimmal 8 karakter huruf dengan kombinasi symbol dan angka
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
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
                    {...(errors.password && { error: true, helperText: 'Kolom ini harus diisi.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                  name='confirm_password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                    {...field}
                      fullWidth
                      label='Konfirmasi Password'
                      type={isConfirmPasswordShown ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              size='small'
                              edge='end'
                              onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isConfirmPasswordShown ? 'ri-eye-off-line text-xl' : 'ri-eye-line text-xl'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      {...(errors.confirm_password && { error: true, helperText: 'Kolom ini harus diisi.' })}
                    />
                  )}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>Ubah Password</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePassword
