import { getStorageItem, setStorageItem } from './localStorage'

const STORAGE_KEYS = {
  THEME: 'fintrack_theme_preference',
  TWO_FACTOR: 'fintrack_two_factor_preference',
}

export function getThemePreference(defaultValue = 'dark') {
  return getStorageItem(STORAGE_KEYS.THEME, defaultValue)
}

export function setThemePreference(theme) {
  return setStorageItem(STORAGE_KEYS.THEME, theme)
}

export function getTwoFactorPreference(defaultValue = false) {
  return getStorageItem(STORAGE_KEYS.TWO_FACTOR, defaultValue)
}

export function setTwoFactorPreference(value) {
  return setStorageItem(STORAGE_KEYS.TWO_FACTOR, value)
}
