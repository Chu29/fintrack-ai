import { useState, useEffect, useMemo } from 'react'
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
import {
  getThemePreference,
  getTwoFactorPreference,
  setThemePreference,
  setTwoFactorPreference,
} from '../../shared/storage/preferences.js'
import { getCategories, deleteCategory } from '../../shared/api/categoriesApi.js'
import { getExpenses, deleteExpense } from '../../shared/api/expensesApi.js'
import { getBudgets, deleteBudget } from '../../shared/api/budgetsApi.js'

const badge =
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em]'

const Settings = () => {
  const auth = useAuth()
  const profile = toProfile(auth)
  const currentYear = useMemo(() => new Date().getUTCFullYear(), [])
  const [themePreference, setThemePreferenceState] = useState(() =>
    getThemePreference('dark'),
  )
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() =>
    getTwoFactorPreference(false),
  )
  const [displayName, setDisplayName] = useState(profile.name)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [actionMessage, setActionMessage] = useState('')
  const [actionError, setActionError] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const resolvedTheme = useMemo(() => {
    if (themePreference === 'system') {
      if (typeof window === 'undefined') {
        return 'dark'
      }
      return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
        ? 'dark'
        : 'light'
    }
    return themePreference
  }, [themePreference])

  const isDarkMode = resolvedTheme === 'dark'

  // Update display name when auth context changes
  useEffect(() => {
    setDisplayName(profile.name)
  }, [profile.name])

  useEffect(() => {
    setThemePreference(themePreference)
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = resolvedTheme || 'dark'
    }
  }, [resolvedTheme, themePreference])

  useEffect(() => {
    setTwoFactorPreference(twoFactorEnabled)
  }, [twoFactorEnabled])

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

  const handleThemeToggle = () => {
    const nextPreference = resolvedTheme === 'dark' ? 'light' : 'dark'
    setThemePreferenceState(nextPreference)
    setActionMessage(
      `Theme preference set to ${nextPreference === 'dark' ? 'dark' : 'light'} mode.`,
    )
    setActionError('')
  }

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled((value) => {
      const nextValue = !value
      setActionMessage(
        `Two-factor authentication ${nextValue ? 'enabled' : 'disabled'} for this device.`,
      )
      setActionError('')
      return nextValue
    })
  }

  const fetchAllExpenses = async () => {
    const allExpenses = []
    let page = 1
    const pageSize = 100
    let totalPages = 1

    while (page <= totalPages) {
      const response = await getExpenses({ page, pageSize })
      const expenses = response?.expenses ?? []
      const pagination = response?.pagination

      allExpenses.push(...expenses)
      totalPages = pagination?.totalPages ?? 1
      page += 1
    }

    return allExpenses
  }

  const getYearsFromExpenses = (expenses) => {
    const years = new Set([currentYear])
    if (currentYear > 2000) {
      years.add(currentYear - 1)
    }
    expenses.forEach((expense) => {
      const expenseYear = new Date(expense.spentAt).getUTCFullYear()
      if (!Number.isNaN(expenseYear)) {
        years.add(expenseYear)
      }
    })

    return Array.from(years).sort()
  }

  const fetchBudgetsForYears = async (years) => {
    const budgets = []
    for (const year of years) {
      const results = await Promise.all(
        Array.from({ length: 12 }, (_, index) =>
          getBudgets({ month: index + 1, year }).catch(() => []),
        ),
      )
      results.forEach((monthBudgets) => {
        budgets.push(...monthBudgets)
      })
    }
    return budgets
  }

  const handleExportData = async () => {
    setIsExporting(true)
    setActionMessage('')
    setActionError('')

    try {
      const [categories, expenses] = await Promise.all([
        getCategories(),
        fetchAllExpenses(),
      ])
      const years = getYearsFromExpenses(expenses)
      const budgets = await fetchBudgetsForYears(years)

      const payload = {
        exportedAt: new Date().toISOString(),
        scope: { years },
        categories,
        expenses,
        budgets,
      }

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `fintrack-export-${new Date()
        .toISOString()
        .slice(0, 10)}.json`
      link.click()
      window.URL.revokeObjectURL(url)

      setActionMessage('Your data export is ready.')
    } catch (error) {
      setActionError(error?.error?.message || 'Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAllData = async () => {
    const confirmed = window.confirm(
      'This will permanently delete budgets, expenses, and categories for your account. Continue?',
    )
    if (!confirmed) {
      return
    }

    setIsDeleting(true)
    setActionMessage('')
    setActionError('')

    try {
      const expenses = await fetchAllExpenses()
      for (const expense of expenses) {
        await deleteExpense(expense.id)
      }

      const years = getYearsFromExpenses(expenses)
      const budgets = await fetchBudgetsForYears(years)
      for (const budget of budgets) {
        await deleteBudget(budget.id)
      }

      const categories = await getCategories()
      for (const category of categories) {
        await deleteCategory(category.id)
      }

      setActionMessage('All available data has been deleted.')
    } catch (error) {
      setActionError(error?.error?.message || 'Failed to delete all data')
    } finally {
      setIsDeleting(false)
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
        {actionMessage || actionError ? (
          <div className="space-y-3">
            {actionMessage ? (
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {actionMessage}
              </div>
            ) : null}
            {actionError ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {actionError}
              </div>
            ) : null}
          </div>
        ) : null}

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
                onClick={handleThemeToggle}
                className={cx(
                  ui.form.toggleTrack,
                  isDarkMode
                    ? ui.form.toggleTrackOn
                    : ui.form.toggleTrackOff,
                )}
                aria-label="Toggle dark interface"
              >
                <span
                  className={cx(
                    ui.form.toggleThumb,
                    isDarkMode
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
                      theme === 'Dark' && themePreference === 'dark'
                        ? 'bg-emerald-100 text-emerald-700'
                        : theme === 'Light' && themePreference === 'light'
                          ? 'bg-emerald-100 text-emerald-700'
                          : theme === 'System' && themePreference === 'system'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600',
                    )}
                    onClick={() => {
                      if (theme === 'Dark') setThemePreferenceState('dark')
                      else if (theme === 'Light') setThemePreferenceState('light')
                      else setThemePreferenceState('system')
                      setActionMessage(`Theme preference set to ${theme.toLowerCase()}.`)
                      setActionError('')
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
                onClick={handleTwoFactorToggle}
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
                onClick={handleExportData}
                disabled={isExporting || isDeleting}
                className={cx(
                  ui.action.secondary,
                  'h-11 rounded-xl',
                  (isExporting || isDeleting) && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isExporting ? 'Exporting...' : 'Export Data'}
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
                onClick={handleExportData}
                disabled={isExporting || isDeleting}
                className={cx(
                  ui.action.secondary,
                  'h-11 w-full rounded-xl',
                  (isExporting || isDeleting) && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isExporting ? 'Preparing Export...' : 'Download All Data'}
              </button>
              <button
                type="button"
                onClick={handleDeleteAllData}
                disabled={isDeleting || isExporting}
                className={cx(
                  ui.action.danger,
                  'h-11 w-full rounded-xl',
                  (isDeleting || isExporting) && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isDeleting ? 'Deleting Data...' : 'Delete All Data'}
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
