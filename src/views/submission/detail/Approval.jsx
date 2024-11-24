import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DecryptData from '@/helpers/DecryptData';
import { Dialog, DialogActions, DialogContent, CircularProgress, DialogTitle } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const Approval = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      catatan: '',
    },
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (status) => {
    const formValues = getValues();
    // Check if catatan is filled before opening the confirmation dialog
    if (!formValues.catatan) {
      toast.error('Kolom catatan harus diisi.');
      return; // Prevent dialog from opening if catatan is empty
    }

    setApprovalStatus(status); // Set the approval/rejection status
    handleClickOpen(); // Open the confirmation dialog
  };

  const handleConfirm = async () => {
    var getIdDecrypt = DecryptData(id);
    setLoading(true);
    
    try {
      const formValues = getValues();
      const reqBody = JSON.stringify({
        request: {
          paper_id: parseInt(getIdDecrypt),
          approval: approvalStatus, 
          note: formValues.catatan,
        },
      });

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'paper/approval-paper',
          requestBody: reqBody,
        }),
      });

      const getResponse = await response.json();
      if (getResponse.status === 200) {
        toast.success('Berhasil memberikan persetujuan!');
        setLoading(false);
        handleClose();
        
        setTimeout(() => {
          router.back();
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
    <Grid item lg={12} md={12} xs={12}>
      <Card>
        <CardHeader title="Approval Persetujuan" />
        <CardContent>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(() => {})} // No need to actually submit the form here
            className="flex flex-col gap-5"
          >
            <Controller
              name="catatan"
              control={control}
              rules={{ required: 'Kolom harus diisi.' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Catatan Persetujuan"
                  placeholder=""
                  error={!!errors.catatan}
                  helperText={errors.catatan?.message}
                />
              )}
            />

            <div className="flex justify-between items-center flex-wrap gap-x-3 gap-y-1">
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => onSubmit("approve")} // Pass "approve" when clicked
              >
                Disetujui
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => onSubmit("reject")} // Pass "reject" when clicked
              >
                Ditolak
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {approvalStatus === "approve" ? "Konfirmasi Persetujuan" : "Konfirmasi Penolakan"}
        </DialogTitle>
        <DialogContent>
          <p>
            {approvalStatus === "approve" 
              ? "Apakah kamu yakin ingin memberikan persetujuan naskah ini?"
              : "Apakah kamu yakin ingin menolak naskah ini?"}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
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

export default Approval;
