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
import FormTaskAssign from '@/views/submission/task-assign/FormTaskAssign'


const ViewFormTaskAssign = () => {

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
    <Grid container>
        <Grid item xs={12} paddingBottom={2}>
            <Typography variant='h4'>Form Penugasan Editor</Typography>
            <Typography>Isi informasi penugasan</Typography>
        </Grid>
      
        <FormTaskAssign/>
    </Grid>
    

  )
}

export default ViewFormTaskAssign
