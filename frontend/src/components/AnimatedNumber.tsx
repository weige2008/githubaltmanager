import CountUp from 'react-countup'

export function AnimatedNumber({ value, duration = 0.8 }: { value: number; duration?: number }) {
  return (
    <CountUp end={value} duration={duration} separator="," />
  )
}
