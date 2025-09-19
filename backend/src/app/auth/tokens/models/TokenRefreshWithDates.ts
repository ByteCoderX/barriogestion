export interface TokenRefreshWithDates {
  token: string
  dates: {
    now: Date
    offset: Date
  }
}
