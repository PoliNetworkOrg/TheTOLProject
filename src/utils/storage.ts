/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE } from './constants'

export class LocalStorage {
  static handleChange() {
    // method to call to update last change date in localStorage
    localStorage.setItem(STORAGE.LAST_CHANGE, JSON.stringify(new Date()))
  }

  static isDateOlderThanSixMonths(date: Date): boolean {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    return date < sixMonthsAgo
  }

  public static checkLastChange() {
    // according to privacy policy, if last change is older
    // than 6 months, then the localStorage has to be cleared
    const date = this.getItem<string>(STORAGE.LAST_CHANGE)
    if (!date) return
    if (this.isDateOlderThanSixMonths(new Date(date))) {
      localStorage.clear()
    }
  }

  public static setItem(key: string, value: any) {
    // custom setItem with JSON.stringify and null/undefined check
    if (value === null || value === undefined) return
    localStorage.setItem(key, JSON.stringify(value))
    this.handleChange()
  }

  public static getItem<T>(key: string): T | null {
    // custom getItem with JSON.parse and null check
    const value = localStorage.getItem(key)
    if (!value) return null
    return JSON.parse(value) as T
  }
}
