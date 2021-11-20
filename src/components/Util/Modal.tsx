import React from 'react'
import { statePair } from '../../utils/types'
import MUIModal from '@mui/material/Modal'
import MUIFade from '@mui/material/Fade'
import MUIBox from '@mui/material/Box'
import MUIBackdrop from '@mui/material/Backdrop'
import { SxProps } from '@mui/system'

const boxStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
}

interface ModalProps {
  openState: statePair<boolean>
  children?: React.ReactNode
}
export default function Modal(props: ModalProps) {
  const [open, setOpen] = props.openState

  const handleClose = () => setOpen(false)

  return (
    <MUIModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={MUIBackdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <MUIFade in={open}>
        <MUIBox sx={boxStyle}>{props.children}</MUIBox>
      </MUIFade>
    </MUIModal>
  )
}
