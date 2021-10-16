import React, {ReactNode} from 'react'
import ReactModal from 'react-modal'
import styled, {css} from 'styled-components'

type ModalProps = {
  onClose: () => void
  children: ReactNode
  isOpen: boolean
  dark?: boolean
}

export default function Modal({
  children,
  onClose,
  isOpen,
  dark = false
}: ModalProps) {
  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose} dark={dark}>
      <Content>
        <Close onClick={onClose} inverted={dark}>
          ╳
        </Close>
        {children}
      </Content>
    </StyledModal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

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
})<{dark: boolean}>`
  .Content {
    background: ${({dark}) => (dark ? '#534449' : '#ffe3c5')};
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

const Close = styled.div<{inverted: boolean}>`
  font-size: 40px;
  margin-right: 16px;
  cursor: pointer;
  ${({inverted}) =>
    inverted &&
    css`
      color: #ddd;
    `}
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`
