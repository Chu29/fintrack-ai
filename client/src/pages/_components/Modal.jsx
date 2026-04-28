import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { cx, appStyles as ui } from './appStyles'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6 backdrop-blur-sm">
      <div
        className={cx(
          ui.surface.elevated,
          'relative w-full max-w-md animate-in fade-in zoom-in duration-200',
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className={ui.text.sectionTitle}>{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
