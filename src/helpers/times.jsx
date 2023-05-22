import { intervalToDuration } from 'date-fns'

export const convertSeconds = totalSeconds => {
  if (totalSeconds === 0) {
    return '00:00'
  }

  const seconds = totalSeconds
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const zeroPad = (num) => String(num).padStart(2, '0')

  const formatted = [
    duration.hours,
    duration.minutes,
    duration.seconds,
  ]
  .filter(Boolean)
  .map(zeroPad)
  .join(':')

  return formatted
}
