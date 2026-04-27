import { useState } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import SyncRoundedIcon from '@mui/icons-material/SyncRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import AppShell from '../_components/AppShell'
import { cx, appStyles as ui } from '../_components/appStyles'
import { getNavigationItems, profile, settingsSidebarAction } from '../_components/appShellData'
import { accentOptions, ledgerStatus, personalIdentity } from './settingsData'

const badge = 'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em]'

const Settings = () => {
  const [minimalInterface, setMinimalInterface] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <AppShell
      navigationItems={getNavigationItems('settings')}
      primaryAction={settingsSidebarAction}
      profile={profile}
      searchPlaceholder="Search preferences..."
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <p className={ui.text.pageEyebrow}>Settings & Preferences</p>
          <div className="h-4 rounded-full bg-slate-100" />
        </header>

        <section className={cx(ui.surface.elevated, 'p-6')}>
          <div className="mb-5">
            <h2 className={ui.text.sectionTitle}>Personal Identity</h2>
            <p className={ui.text.muted}>Manage your digital presence and curator credentials.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
            <article className={cx(ui.surface.inner, 'flex flex-col items-center justify-center gap-4 px-6 py-7 text-center')}>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-slate-300 to-slate-500 text-2xl font-black text-white shadow-lg shadow-slate-300/30">
                AS
                <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white bg-emerald-400" />
              </div>
              <p className={cx(badge, 'bg-amber-100 text-amber-700')}>{personalIdentity.role}</p>
            </article>

            <article className={cx(ui.surface.inner, 'space-y-6 p-5')}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className={ui.text.overline}>Full Name</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{personalIdentity.name}</p>
                </div>
                <div>
                  <p className={ui.text.overline}>Email Address</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{personalIdentity.email}</p>
                </div>
              </div>

              <div>
                <p className={ui.text.overline}>Professional Bio</p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{personalIdentity.bio}</p>
              </div>

              <div className="flex justify-end">
                <button type="button" className={cx(ui.action.primary, 'h-11 rounded-xl px-6')}>
                  Update Profile
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className={cx(ui.surface.elevated, 'space-y-5 p-6')}>
            <div className="flex items-center gap-2.5">
              <PaletteRoundedIcon className="text-dashboard-accent" fontSize="small" />
              <h3 className={ui.text.sectionTitle}>Aesthetic & Interface</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Dark Interface</p>
                <p className="text-xs text-slate-500">Reduce eye strain with obsidian tones.</p>
              </div>
              <button
                type="button"
                onClick={() => setMinimalInterface((value) => !value)}
                className={cx(
                  ui.form.toggleTrack,
                  minimalInterface ? ui.form.toggleTrackOn : ui.form.toggleTrackOff,
                )}
                aria-label="Toggle dark interface"
              >
                <span
                  className={cx(
                    ui.form.toggleThumb,
                    minimalInterface ? ui.form.toggleThumbOn : ui.form.toggleThumbOff,
                  )}
                />
              </button>
            </div>

            <div className="space-y-2.5">
              <p className={ui.text.overline}>Accent Signature</p>
              <div className="flex flex-wrap gap-2">
                {accentOptions.map((option) => (
                  <span
                    key={option.id}
                    className={cx(
                      badge,
                      option.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className={cx(ui.surface.elevated, 'space-y-5 p-6')}>
            <div className="flex items-center gap-2.5">
              <SyncRoundedIcon className="text-dashboard-accent" fontSize="small" />
              <h3 className={ui.text.sectionTitle}>Ledger Synchronization</h3>
            </div>

            <div className={cx(ui.surface.inner, 'space-y-2 p-4')}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">{ledgerStatus.title}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">Update every 20s</p>
              </div>
              <p className="text-xs leading-5 text-slate-600">{ledgerStatus.detail}</p>
            </div>

            <button type="button" className={cx(ui.action.secondary, 'h-11 w-full rounded-xl')}>
              Install Desktop Curator
            </button>
          </article>
        </section>

        <section className={cx(ui.surface.elevated, 'space-y-5 p-6')}>
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <SecurityRoundedIcon className="text-dashboard-accent" fontSize="small" />
              <h3 className={ui.text.sectionTitle}>Security & Governance</h3>
            </div>
            <button type="button" className={cx(ui.action.link, 'text-[0.64rem]')}>
              Security Audit Log
            </button>
          </header>

          <div className={cx(ui.surface.inner, 'space-y-4 p-4')}>
            <div className="flex items-center justify-between gap-4 border-b border-dashboard-border pb-3">
              <div className="flex items-start gap-3">
                <ShieldRoundedIcon className="mt-0.5 text-slate-500" fontSize="small" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Verify your identity via mobile authenticator for all large transactions.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled((value) => !value)}
                className={cx(
                  ui.form.toggleTrack,
                  twoFactorEnabled ? ui.form.toggleTrackOn : ui.form.toggleTrackOff,
                )}
                aria-label="Toggle two-factor authentication"
              >
                <span
                  className={cx(
                    ui.form.toggleThumb,
                    twoFactorEnabled ? ui.form.toggleThumbOn : ui.form.toggleThumbOff,
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <PersonRoundedIcon className="mt-0.5 text-slate-500" fontSize="small" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Account Passphrase</p>
                  <p className="text-xs text-slate-500">Recommended update every 90 days for optimal vault security.</p>
                </div>
              </div>
              <button type="button" className={cx(ui.action.link, 'text-[0.64rem]')}>
                Change Password
              </button>
            </div>
          </div>
        </section>

        <section className={cx(ui.surface.elevated, 'flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between')}>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-slate-800">Data Sovereignty</h3>
            <p className="text-xs text-slate-500">Export your ledger or revoke access entirely.</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button type="button" className={cx(ui.action.secondary, 'h-10 rounded-xl px-4 text-xs')}>Export as CSV</button>
            <button type="button" className={cx(ui.action.secondary, 'h-10 rounded-xl px-4 text-xs')}>Annual Report PDF</button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-rose-600 px-4 text-xs font-bold text-white transition hover:bg-rose-700"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default Settings
