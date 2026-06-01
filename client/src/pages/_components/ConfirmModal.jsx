import Modal from './Modal'
import { cx, appStyles as ui } from './appStyles'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', tone = 'danger' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className={ui.text.body}>{message}</p>
      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={onClose}
          className={cx(ui.action.secondary, 'px-5')}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={cx(
            tone === 'danger' ? 'bg-rose-500 text-white hover:bg-rose-600' : ui.action.primary,
            'inline-flex items-center justify-center rounded-[10px] px-5 text-[13px] font-medium transition duration-200'
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
