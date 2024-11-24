import React, { useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { Grid, Card, CardContent, TextField, CircularProgress, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CompApproval from '@/views/apps/component/CompApproval';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import DecryptData from '@/helpers/DecryptData';
import { useRouter } from 'next/navigation';

const FormTaskAssign = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const PUBLISHER_ID = `${process.env.NEXT_PUBLIC_PUBLISHER_ID}`
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      catatan: '',
      approval: [],
    },
  });

  const onSubmit = () => {
    if (Object.keys(errors).length === 0) {
      handleClickOpen();
    } else {
      toast.error('Invalid Data');
    }
  };

  const handleConfirm = async (id) => {
    var getIdDecrypt = DecryptData(id)

    setLoading(true);
    try {
      const formValues = getValues();
      const setApproval  = [];

      formValues.approval.map((getDataApproval)=> {
        const getValue = DecryptData(getDataApproval.value)
        const getValueList = getValue.split("|")

        setApproval.push(
          {
              user_id: parseInt(getValueList),
              name: getValueList[1],
              role_name: getValueList[2],
              entry_time: '',
              entry_note: '',
          }
        )
      })

      const reqBody = JSON.stringify({
        request: {
          publisher_id: parseInt(PUBLISHER_ID),
          paper_id: parseInt(getIdDecrypt),
          user_id: 1029,
          approval_list: setApproval,
          catatan_assignment:formValues.catatan
        },
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'paper/assign-paper',
          requestBody: reqBody,
        }),
      });

      const getResponse = await response.json();
      if (getResponse.status === 200) {
        toast.success('Naskah sudah diassign ke editor!');
        setLoading(false);
        handleClose();

        setTimeout(() => {
          router.back()
        }, 2000);
      } else {
        setLoading(false);
        toast.error('Invalid Data');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="">
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="catatan"
                  control={control}
                  rules={{ required: 'Kolom harus diisi.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Catatan Penugasan Reviewer"
                      placeholder=""
                      error={!!errors.catatan}
                      helperText={errors.catatan?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={8} paddingTop={2}>
              <CompApproval
                control={control}
                errors={errors}
                setValue={setValue}
              />
            </Grid>

            <Grid item xs={12} className="flex gap-2" paddingTop={2}>
              <Button variant="contained" type="submit">Submit</Button>
              {/* <Button variant="outlined" type="reset" onClick={() => reset()}>Reset</Button> */}
            </Grid>
          </CardContent>
        </Card>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Penugasan Review Naskah</DialogTitle>
        <DialogContent>
          <p>Apakah kamu yakin ingin memberikan penugasan ke user approval yang sudah dipilih?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button
            onClick={() => handleConfirm(id)}
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Ya"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FormTaskAssign;
