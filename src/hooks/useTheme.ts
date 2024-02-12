import React from 'react'
import { createTheme } from '@mui/material'
import getDesignTokens from '../theme/ThemeSettings'
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})
const LOCAL_STORAGE_KEY = 'theme'
export default function useTheme() {
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    () =>
      (localStorage.getItem(LOCAL_STORAGE_KEY) as 'light' | 'dark') || 'light',
  )
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, mode)
  }, [mode])
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return {
    theme,
    colorMode,
  }
}
