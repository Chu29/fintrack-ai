import { useState, useEffect } from 'react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import AppShell from '../_components/AppShell'
import { cx, appStyles as ui } from '../_components/appStyles'
import {
  getNavigationItems,
  settingsSidebarAction,
} from '../_components/appShellData'
import { useAuth } from '../../shared/auth/AuthContext.jsx'
import { toProfile } from '../../shared/uiData'
import { updateProfile } from '../../shared/api/profileApi.js'

const badge =
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em]'

const Settings = () => {
  const auth = useAuth()
  const profile = toProfile(auth)
  const [minimalInterface, setMinimalInterface] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [displayName, setDisplayName] = useState(profile.name)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')
  const [updateError, setUpdateError] = useState('')

  // Update display name when auth context changes
  useEffect(() => {
    setDisplayName(profile.name)
  }, [profile.name])

  const handleUpdateProfile = async () => {
    if (!displayName.trim() || displayName === profile.name) {
      return
    }

    setIsUpdating(true)
    setUpdateMessage('')
    setUpdateError('')

    try {
      // Update profile in database
      await updateProfile({ name: displayName.trim() })

      // Refresh auth context with updated user data
      await auth.refreshUserProfile()

      setUpdateMessage('Profile updated successfully!')
      // Update the local display name to match the updated profile
      setDisplayName(displayName.trim())
    } catch (error) {
      setUpdateError(error?.error?.message || 'Failed to update profile')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <AppShell
      navigationItems={getNavigationItems('settings')}
      primaryAction={settingsSidebarAction}
      profile={profile}
      searchPlaceholder="Search preferences..."
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <header className="space-y-2">
            <p className={ui.text.pageEyebrow}>Settings & Preferences</p>
            <h1 className={ui.text.pageTitle}>Settings</h1>
          </header>
        </div>

        {/* Personal Identity Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <div className="mb-6 flex items-center gap-2.5">
            <PersonRoundedIcon
              className="text-dashboard-accent"
              fontSize="small"
            />
            <h2 className={ui.text.sectionTitle}>Personal Identity</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Profile Card */}
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-inner p-6 text-center">
              <div className="mb-4">
                {profile.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt={profile.name}
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="mx-auto bg-dashboard-avatar flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white">
                    {profile.initials}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-dashboard-ink">
                  {profile.name}
                </p>
                <p className="text-sm text-dashboard-secondary">
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              {/* Status Messages */}
              {updateMessage ? (
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {updateMessage}
                </div>
              ) : null}
              {updateError ? (
                <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
                  {updateError}
                </div>
              ) : null}

              <div>
                <p className="text-sm font-semibold text-dashboard-ink">
                  Display Name
                </p>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={cx(ui.form.field, 'w-full')}
                  aria-label="Display name"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-dashboard-ink">
                  Email Address
                </p>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  disabled
                  className={cx(
                    ui.form.field,
                    'w-full',
                    'bg-dashboard-inner cursor-not-allowed',
                  )}
                  aria-label="Email address (read-only)"
                />
                <p className="mt-1 text-xs text-dashboard-secondary">
                  Email cannot be changed. Contact support if you need to update
                  your email.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className={cx(ui.action.secondary, 'h-11 rounded-xl px-6')}
                  onClick={() => {
                    setDisplayName(profile.name)
                    setUpdateMessage('')
                    setUpdateError('')
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  disabled={
                    isUpdating ||
                    !displayName.trim() ||
                    displayName === profile.name
                  }
                  className={cx(
                    ui.action.primary,
                    'h-11 rounded-xl px-6',
                    (isUpdating ||
                      !displayName.trim() ||
                      displayName === profile.name) &&
                      'opacity-50 cursor-not-allowed',
                  )}
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Aesthetic & Interface Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <div className="mb-6 flex items-center gap-2.5">
            <PaletteRoundedIcon
              className="text-dashboard-accent"
              fontSize="small"
            />
            <h2 className={ui.text.sectionTitle}>Aesthetic & Interface</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-dashboard-ink">
                  Dark Interface
                </p>
                <p className="text-xs text-dashboard-secondary">
                  Reduce eye strain with obsidian tones.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMinimalInterface((value) => !value)}
                className={cx(
                  ui.form.toggleTrack,
                  minimalInterface
                    ? ui.form.toggleTrackOn
                    : ui.form.toggleTrackOff,
                )}
                aria-label="Toggle dark interface"
              >
                <span
                  className={cx(
                    ui.form.toggleThumb,
                    minimalInterface
                      ? ui.form.toggleThumbOn
                      : ui.form.toggleThumbOff,
                  )}
                />
              </button>
            </div>

            <div className="space-y-3">
              <p className={ui.text.overline}>Theme</p>
              <div className="flex flex-wrap gap-2">
                {['Dark', 'Light', 'System'].map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={cx(
                      badge,
                      theme === 'Dark' && minimalInterface
                        ? 'bg-emerald-100 text-emerald-700'
                        : theme === 'Light' && !minimalInterface
                          ? 'bg-emerald-100 text-emerald-700'
                          : theme === 'System'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600',
                    )}
                    onClick={() => {
                      if (theme === 'Dark') setMinimalInterface(true)
                      else if (theme === 'Light') setMinimalInterface(false)
                      // System theme would need additional implementation
                    }}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security & Governance Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <div className="mb-6 flex items-center gap-2.5">
            <SecurityRoundedIcon
              className="text-dashboard-accent"
              fontSize="small"
            />
            <h2 className={ui.text.sectionTitle}>Security & Governance</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-dashboard-ink">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-dashboard-secondary">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled((value) => !value)}
                className={cx(
                  ui.form.toggleTrack,
                  twoFactorEnabled
                    ? ui.form.toggleTrackOn
                    : ui.form.toggleTrackOff,
                )}
                aria-label="Toggle two-factor authentication"
              >
                <span
                  className={cx(
                    ui.form.toggleThumb,
                    twoFactorEnabled
                      ? ui.form.toggleThumbOn
                      : ui.form.toggleThumbOff,
                  )}
                />
              </button>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <button
                type="button"
                className={cx(ui.action.secondary, 'h-11 rounded-xl')}
              >
                Change Password
              </button>
              <button
                type="button"
                className={cx(ui.action.secondary, 'h-11 rounded-xl')}
              >
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Data Sovereignty Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <div className="mb-6 flex items-center gap-2.5">
            <ShieldRoundedIcon
              className="text-dashboard-accent"
              fontSize="small"
            />
            <h2 className={ui.text.sectionTitle}>Data Sovereignty</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-dashboard-ink">
                  Local Storage
                </p>
                <p className="text-xs text-dashboard-secondary">
                  Keep your data stored locally on this device.
                </p>
              </div>
              <button
                type="button"
                className={cx(ui.form.toggleTrack, ui.form.toggleTrackOn)}
                aria-label="Toggle local storage"
              >
                <span
                  className={cx(ui.form.toggleThumb, ui.form.toggleThumbOn)}
                />
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className={cx(ui.action.secondary, 'h-11 w-full rounded-xl')}
              >
                Download All Data
              </button>
              <button
                type="button"
                className={cx(ui.action.danger, 'h-11 w-full rounded-xl')}
              >
                Delete All Data
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-dashboard-secondary">
            FINTRACK • SETTINGS MANAGER • CONFIGURATION ACTIVE
          </p>
        </div>
      </div>
    </AppShell>
  )
}

export default Settings
