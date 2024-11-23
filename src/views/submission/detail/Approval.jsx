import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from "@mui/material/TextField";
import { useState, Fragment,useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object, string, pipe, nonEmpty } from "valibot";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import { toast } from 'react-toastify'
import classnames from 'classnames'

const buttonProps = (variant, rel, className) => ({
    variant,
    rel,
    className: `${className} text-[22px] text-textSecondary`
  })

const schema = object({
    catatan: pipe(
      string(),
      nonEmpty("Catatan Harus Diisi"),
    ),
  });

const ConfirmationDialog = ({ open, setOpen, type, dataId, setData, data }) => {
    const [secondDialog, setSecondDialog] = useState(false)
    const [userInput, setUserInput] = useState(false)
  
    console.log('setData confirm', setData)
    console.log('data confirm', data)
  
    const Wrapper = type === 'suspend-account' ? 'div' : Fragment
  
    const handleSecondDialogClose = () => {
      setSecondDialog(false)
      setOpen(false)
    }
  
    const handleConfirmation = async value => {
      if (value) {
        toast.info("Successs")
        // const data = await DeleteData(dataId)
        // console.log('data handleconfirmation', data)
  
        // setData(await getDatas(2, 10))
  
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
                {type === 'submit-data' && 'Apakah kamu yakin ingin memberikan persetujuan ini?'}
              </Typography>
            </Wrapper>
          </DialogContent>
          <DialogActions className='gap-2 justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
            <Button variant='contained' onClick={() => handleConfirmation(true)}>
              {type === 'submit-data' ? 'Iya, Simpan data' : 'Tidak'}
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                handleConfirmation(false)
              }}
            >
              Batalkan
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
}
const OpenDialogOnElementClick = props => {
    const { element: Element, dialog: Dialog, elementProps, dialogProps, dataId, data, setData } = props
  
    const [open, setOpen] = useState(false)
  
    console.log('data confirm open click', data)
  
    const { onClick: elementOnClick, ...restElementProps } = elementProps
  
    const handleOnClick = e => {
      elementOnClick && elementOnClick(e)
      setOpen(true)
    }
  
    return (
      <>
        <Element onClick={handleOnClick} {...restElementProps} />
        <Dialog open={open} setOpen={setOpen} dataId={dataId} data={data} setData={setData} {...dialogProps} />
      </>
    )
}

const Approval = () => {
    // States
    const [errorState, setErrorState] = useState(null);
    // const [state, formAction] = useFormState;

    const [open, setOpen] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
        catatan: "",
        },
    });

  const onSubmit = async (data) => {
    
  };

  return (
    <Grid item lg={12} md={12} xs={12}>

        <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
            <DialogContent className='flex items-center flex-col text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'>
            <i className='ri-error-warning-line text-[88px] mbe-6 text-warning' />

                <Typography variant='h5'>
                { 'Apakah kamu yakin ingin menyetujui ini?'}
                </Typography>

            </DialogContent>
            <DialogActions className='gap-2 justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
            <Button variant='contained' onClick={() => handleConfirmation(true)}>
                {'Yes, Saya setuju'}
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
        <Card>
            <CardHeader title='Approval Persetujuan' />
            <CardContent>
                <form
                    noValidate
                    action={() => {}}
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <Controller
                        name="catatan"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            fullWidth
                            autoFocus
                            type="text"
                            label="Catatan Persetujuan"
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                errorState !== null && setErrorState(null);
                            }}
                            {...((errors.catatan || errorState !== null) && {
                                error: true,
                                helperText: errors?.catatan?.message || errorState,
                            })}
                            />
                        )}
                    />
                    
                    <div className="flex justify-between items-center flex-wrap gap-x-3 gap-y-1">
                        {/* <OpenDialogOnElementClick
                            element={IconButton}
                            elementProps={buttonProps('contained', 'icon', 'ri-delete-bin-7-line')}
                            dialog={ConfirmationDialog}
                            setData={1}
                            data={data}
                            dataId={data}
                            /> */}
                        
                        <Button fullWidth variant="contained" color='success' type="submit">
                        Disetujui
                        </Button>
                        <Button fullWidth variant="contained" color= 'error' type="submit">
                        Ditolak
                        </Button>
                    </div>
                    
                </form>
            </CardContent>
        </Card>
    </Grid>
  )
}

export default Approval
