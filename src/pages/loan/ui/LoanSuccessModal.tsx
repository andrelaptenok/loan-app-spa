import { Button, Modal } from '@shared'

interface LoanSuccessModalProps {
  open: boolean
  onClose: () => void
  fullName: string
  amount: number
  term: number
}

export const LoanSuccessModal = (props: LoanSuccessModalProps) => {
  const { open, onClose, fullName, amount, term } = props
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Application submitted"
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <p className="mb-0">
        Congratulations, {fullName}. You have been approved for ${amount} for {term} days.
      </p>
    </Modal>
  )
}
