import { createContext, useEffect, useState } from 'react'

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
      const val = !prev
      localStorage.setItem('is_dsa', JSON.stringify(val))
      return val
    })
  }

  useEffect(() => {
    const localValue = localStorage.getItem('is_dsa')
    if (localValue === null) return
    const boolValue = JSON.parse(localValue)
    setIsDsa(boolValue)
  }, [])

  return <TestContext.Provider value={{ isDsa: isDsa, toggleDsa }} {...props} />
}
