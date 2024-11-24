import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';

const ConfirmDialog = ({ open, handleClose, handleConfirm, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Konfirmasi Penghapusan</DialogTitle>
      <DialogContent>
        <p>Apakah Anda yakin ingin menghapus item ini?</p>
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
            'Ya, Hapus'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
