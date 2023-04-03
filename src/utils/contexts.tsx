import { createContext, useEffect, useState } from 'react'
import { STORAGE } from './constants'
import { LocalStorage } from './storage'

export const MobileContext = createContext({
  mobile: false
})

interface ITestContext {
  isDsa: boolean
  toggleDsa: () => void
}
export const TestContext = createContext<ITestContext>({
  isDsa: false,
  toggleDsa: () => {
    // implemented in Provider
  }
})

type TestProviderProps = React.HTMLAttributes<React.ProviderProps<ITestContext>>
export const TestProvider = (props: TestProviderProps) => {
  const [isDsa, setIsDsa] = useState<boolean>(false)

  const toggleDsa = () => {
    setIsDsa((prev) => {
      const value = !prev
      LocalStorage.setItem(STORAGE.DSA, value)
      return value
    })
  }

  useEffect(() => {
    const localValue = LocalStorage.getItem(STORAGE.DSA)
    if (localValue === null) return
    setIsDsa(localValue)
  }, [])

  return <TestContext.Provider value={{ isDsa, toggleDsa }} {...props} />
}
