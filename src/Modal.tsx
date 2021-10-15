import React, {ReactNode} from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

type ModalProps = {
  onClose: () => void
  children: ReactNode
  isOpen: boolean
}

export default function Modal({children, onClose, isOpen}: ModalProps) {
  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </StyledModal>
  )
}

function ReactModalWrapper({className, modalClassName, ...props}) {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      ariaHideApp={false}
      {...props}
    />
  )
}

const StyledModal = styled(ReactModalWrapper).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Content'
})`
  .Content {
    background: #ffe3c5;
    border-radius: 8px;
    box-shadow: 0px 2px 16px rgba(255, 241, 216, 0.2);
    outline: none;
    width: 920px;
    overflow-y: auto;

    @media (max-width: 920px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      height: 100vh;
      border-radius: 0px;
    }
  }

  .Overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1001;
  }
`
