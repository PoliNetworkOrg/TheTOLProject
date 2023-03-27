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

function isDateOlderThanSixMonths(date: Date): boolean {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  return date < sixMonthsAgo
}

type TestProviderProps = React.HTMLAttributes<React.ProviderProps<ITestContext>>
export const TestProvider = (props: TestProviderProps) => {
  const [isDsa, setIsDsa] = useState<boolean>(false)

  const toggleDsa = () => {
    setIsDsa((prev) => {
      const value = !prev
      const date = new Date()
      const data = { value, date }
      localStorage.setItem('is_dsa', JSON.stringify(data))
      return value
    })
  }

  useEffect(() => {
    const localValue = localStorage.getItem('is_dsa')
    if (localValue === null) return
    const { date, value } = JSON.parse(localValue)
    const changeDate = new Date(date)
    if (isDateOlderThanSixMonths(changeDate)) {
      // the preference is older than 6 months ago, so it should be ignored and deleted
      localStorage.removeItem('is_dsa')
    } else {
      // set the current value to saved one
      setIsDsa(value)
    }
  }, [])

  return <TestContext.Provider value={{ isDsa: isDsa, toggleDsa }} {...props} />
}
