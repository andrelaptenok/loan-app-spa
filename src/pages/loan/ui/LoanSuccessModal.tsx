import { Button, Modal } from '@shared'

interface LoanSuccessModalProps {
  open: boolean
  onClose: () => void
  fullName: string
  amount: number
  term: number
}

export const LoanSuccessModal = ({ open, onClose, fullName, amount, term }: LoanSuccessModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Application submitted"
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <p className="mb-0">
        Congratulations, {fullName}. You are approved for ${amount} for {term} days.
      </p>
    </Modal>
  )
}

