import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'

function readValue<T>(key: string, initialValue: T): T {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return initialValue
    return JSON.parse(item) as T
  } catch {
    // Обратная совместимость: raw-строки (до перехода на JSON)
    const item = localStorage.getItem(key)
    if (typeof initialValue === 'string' && item !== null) {
      return item as unknown as T
    }
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
      // Ключ изменился — читаем из нового ключа, не пишем
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
