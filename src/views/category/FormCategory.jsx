'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'


const FormCategory = () => {

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
      category_name: '',
      deskripsi: '',
    }
  })

  const onSubmit =  async () => {
    await submitData();

  }

  const submitData = async () => {
 
    const fields = [
        'category_name', 'deskripsi'
      ];

      const formData = fields.reduce((acc, field) => {
        acc[field] = getValues(field); 
        return acc;
      }, {});

    try {
        
        const reqBody =  JSON.stringify({
              "request": { 
              "category_name":formData.category_name,
              "description":formData.deskripsi,
            }
        })

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'category/add',
                requestBody: reqBody
            })
        });

        const getResponse = await response.json();
        if (getResponse.status == 201) {
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
            <Typography variant='h4'>Form Kategori</Typography>
            <Typography>Isi informasi kategori</Typography>
        </Grid>
      
          <Grid item xs={12} sm={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardContent>
                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={8}>
                            <Controller
                                name='category_name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label='Nama Kategori'
                                    placeholder=''
                                    {...(errors.category_name && { error: true, helperText: 'Kolom harus diisi.' })}
                                />
                                )}
                            />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                            <Controller
                                name='deskripsi'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label='Deskripsi'
                                    placeholder=''
                                    {...(errors.deskripsi && { error: true, helperText: 'Kolom harus diisi.' })}
                                />
                                )}
                            />
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

export default FormCategory
