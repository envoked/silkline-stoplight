import { useEffect, useState } from "react"

type Light = {
  on: string;
  off: string;
  duration: number;
}

const LIGHTS: Record<string, Light> = {
  red: { on: 'bg-red-400', off: 'bg-red-900', duration: 2000 },
  yellow: { on: 'bg-yellow-400', off: 'bg-yellow-900', duration: 1000 },
  green: { on: 'bg-green-400', off: 'bg-green-900', duration: 5000 },
}

// Order the lights turn on
const CYCLE: readonly string[] = ['green', 'yellow', 'red']

function Stoplight() {
  const [step, setStep] = useState(0)
  const curLight = CYCLE[step]

  useEffect(() => {
    const id = window.setTimeout(
      () => setStep((s) => (s + 1) % CYCLE.length),
      LIGHTS[curLight].duration,
    )
    return () => window.clearTimeout(id)
  }, [step, curLight])

  return (
    <div
      role="img"
      aria-label={`Current Light: ${curLight}`}
      className="flex flex-col gap-3 rounded-3xl bg-neutral-900 p-6"
    >
      {Object.entries(LIGHTS).map(([id, { on, off }]) => (
        <div
          key={id}
          className={`size-16 rounded-full transition-colors duration-300 ${
            curLight === id ? on : off
          }`}
        />
      ))}
    </div>
  )
}

export default Stoplight
