// Helper function to calculate consecutive submission days
export function calculateStreak(submissions: { createdAt: Date }[]): number {
  if (submissions.length === 0) return 0

  // Get unique submission dates (normalize to start of day)
  const submissionDates = submissions
    .map(sub => {
      const date = new Date(sub.createdAt)
      date.setHours(0, 0, 0, 0)
      return date.getTime()
    })
    .filter((date, index, self) => self.indexOf(date) === index) // Remove duplicates
    .sort((a, b) => b - a) // Sort descending (most recent first)

  if (submissionDates.length === 0) return 0

  // Check if there's a submission today or yesterday
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const mostRecentDate = submissionDates[0]
  const todayTime = today.getTime()
  const yesterdayTime = yesterday.getTime()

  // If most recent submission is not today or yesterday, streak is broken
  if (mostRecentDate !== todayTime && mostRecentDate !== yesterdayTime) {
    return 0
  }

  // Count consecutive days
  let streak = 1
  let expectedDate = mostRecentDate

  for (let i = 1; i < submissionDates.length; i++) {
    expectedDate -= 24 * 60 * 60 * 1000 // Subtract one day
    if (submissionDates[i] === expectedDate) {
      streak++
    } else {
      break
    }
  }

  return streak
}
