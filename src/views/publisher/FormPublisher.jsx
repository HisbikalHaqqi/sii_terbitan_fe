'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import ConvertDate from '@/helpers/ConvertDate'

const FormPublisher = () => {

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
        nama_publisher: '',
        alamat: '',
        email: '',
        tahun_berdiri: '',
        dob: null,
        kota: '',
        phone: '',
        cp2: '',
        fax: '',
        fb:'',
        twitter_link:'',
        web_link:'',
        kota:'',
    }
  })

  const onSubmit =  async () => {
    await submitData();
  }

  const submitData = async () => {
 
    const fields = [
        'nama_publisher', 'alamat', 'email', 'tahun_berdiri', 'dob',
        'kota', 'phone', 'cp2', 'fax',
        'fb', 'twitter_link', 'web_link'
      ];

      const formData = fields.reduce((acc, field) => {
        acc[field] = getValues(field); 
        return acc;
      }, {});

    try {
    
        const reqBody =  JSON.stringify({
            "request": { 
                "id":1,
                "name":formData.nama_publisher,
                "address":formData.alamat,
                "phone":formData.phone,
                "email":formData.email,
                "website":formData.web_link,
                "country":"Indonesia",
                "contact_person_1":formData.phone,
                "contact_person_2":formData.cp2,
                "fax":formData.fax,
                "social_fb_links":formData.fb,
                "social_twitter_links":formData.twitter_link,
                "social_web_links":formData.web_link,
                "founded_year":formData.tahun_berdiri,
            }
        })


        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'publisher/update',
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
    <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Form Penerbit</Typography>
                        <Typography>Isi informasi penerbit</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Card>
                            <CardContent>
                                
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='nama_publisher'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Nama Publisher'
                                            placeholder='John'
                                            {...(errors.nama_publisher && { error: true, helperText: 'Kolom harus diisi' })}
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
                                            label='Alamat'
                                            placeholder='Doe'
                                            {...(errors.alamat && { error: true, helperText: 'Kolom harus diisi' })}
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
                                            fullWidth
                                            type='email'
                                            label='Email'
                                            placeholder='johndoe@gmail.com'
                                            {...(errors.email && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='tahun_berdiri'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Tahun Berdiri'
                                            placeholder='1998'
                                            {...(errors.tahun_berdiri && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='kota'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Kota'
                                            placeholder='Jakarta'
                                            {...(errors.kota && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='phone'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Contact Person 1'
                                            placeholder='Contact Person 1'
                                            {...(errors.phone && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='cp2'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Contact Person 2'
                                            placeholder='Contact Person 2'
                                            {...(errors.cp2 && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Card>
                            <CardHeader title='Informasi Lainnya' />
                            <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='fax'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Fax'
                                            placeholder='000'
                                            {...(errors.fax && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='fb'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Facebook Link'
                                            placeholder=''
                                            {...(errors.fb && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='twitter_link'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Twitter Link'
                                            placeholder=''
                                            {...(errors.twitter_link && { error: true, helperText: 'Kolom harus diisi' })}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='web_link'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label='Web Link'
                                            placeholder=''
                                            {...(errors.web_link && { error: true, helperText: 'Kolom harus diisi' })}
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

export default FormPublisher
