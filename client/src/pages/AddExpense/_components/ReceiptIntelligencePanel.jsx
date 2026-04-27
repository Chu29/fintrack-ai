import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const ReceiptIntelligencePanel = ({
  progress,
  progressLabel,
  progressState,
  statusTitle,
  statusDetail,
}) => {
  return (
    <aside className={cx(ui.surface.elevated, 'p-6')}>
      <div className={ui.layout.row}>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-dashboard-accent/12 text-dashboard-accent">
          <CameraAltRoundedIcon fontSize="small" />
        </span>
        <h2 className={ui.text.sectionTitle}>Receipt Intelligence</h2>
      </div>

      <div className={cx(ui.form.uploadZone, 'mt-6')}>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(61,75,96,0.06),transparent_40%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-[30px] border border-dashboard-border-soft bg-white/80 blur-[1px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-34 w-52 -translate-x-1/2 -translate-y-1/2 rotate-10 rounded-[26px] border border-dashboard-border bg-dashboard-inner/90" />

        <div className="relative">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-dashboard-accent/16 text-dashboard-accent">
            <CameraAltRoundedIcon />
          </span>
          <p className="mt-5 text-lg font-bold tracking-tight text-dashboard-ink">
            Scan Receipt
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Drag and drop or click to upload
          </p>
        </div>
      </div>

      <div className={cx(ui.layout.between, 'mt-6')}>
        <p className={ui.text.overline}>{progressLabel}</p>
        <p className={cx(ui.text.overline, ui.text.accent)}>{progressState}</p>
      </div>

      <div className={cx(ui.form.progressTrack, 'mt-3')}>
        <div
          className={ui.form.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={cx(ui.form.statusCard, 'mt-5')}>
        <div className="flex items-start gap-3">
          <CheckCircleRoundedIcon
            className="mt-0.5 text-dashboard-accent"
            fontSize="small"
          />
          <div>
            <p className={ui.text.label}>{statusTitle}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {statusDetail}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ReceiptIntelligencePanel
