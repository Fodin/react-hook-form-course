import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'

function readValue<T>(key: string, initialValue: T): T {
  const item = localStorage.getItem(key)
  if (item === null) return initialValue

  try {
    return JSON.parse(item)
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue))
  const prevKeyRef = useRef(key)

  useEffect(() => {
    if (prevKeyRef.current !== key) {
      prevKeyRef.current = key
      setValue(readValue(key, initialValue))
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // ignore write errors
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value])

  return [value, setValue]
}
