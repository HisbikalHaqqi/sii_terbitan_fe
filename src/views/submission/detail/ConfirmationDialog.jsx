'use client'

// React Imports
import { Fragment, useEffect, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import { revalidatePath, revalidateTag } from 'next/cache'

const ConfirmationDialog = ({ open, setOpen, type, dataId }) => {
  // States
  const [secondDialog, setSecondDialog] = useState(false)
  const [userInput, setUserInput] = useState(false)

  // Vars
  const Wrapper = type === 'suspend-account' ? 'div' : Fragment

  const handleSecondDialogClose = () => {
    setSecondDialog(false)
    setOpen(false)
  }

  const handleConfirmation = async value => {
    console.log('valuesConfirmation', value)
    console.log('dataId', dataId)
    if (value) {
      const data = await handleDelete(dataId)
      console.log('data delete', data)
      setUserInput(value)
      setSecondDialog(true)
      setOpen(false)
    } else {
      setUserInput(value)
      setSecondDialog(true)
      setOpen(false)
    }
  }

  useEffect(() => {
    if (!open && userInput) {
    }
  }, [open, userInput])

  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <DialogContent className='flex items-center flex-col text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i className='ri-error-warning-line text-[88px] mbe-6 text-warning' />

          <Wrapper>
            <Typography variant='h5'>
              {type === 'delete-data' && 'Are you sure you want to delete this account?'}
            </Typography>
          </Wrapper>
        </DialogContent>
        <DialogActions className='gap-2 justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={() => handleConfirmation(true)}>
            {type === 'delete-data' ? 'Yes, Delete User' : 'Yes'}
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => {
              handleConfirmation(false)
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={secondDialog} onClose={handleSecondDialogClose}>
        <DialogContent className='flex items-center flex-col text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i
            className={classnames('text-[88px] mbe-8', {
              'ri-checkbox-circle-line': userInput,
              'text-success': userInput,
              'ri-close-circle-line': !userInput,
              'text-error': !userInput
            })}
          />
          <Typography variant='h4' className='mbe-5'>
            {userInput ? `${type === 'delete-data' ? 'Deleted' : 'Suspended!'}` : 'Cancelled'}
          </Typography>
          <Typography color='text.primary'>
            {userInput ? (
              <>{type === 'delete-data' && 'This account has been deleted successfully.'}</>
            ) : (
              <>{type === 'delete-data' && 'Account Deleted Cancelled!'}</>
            )}
          </Typography>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog
