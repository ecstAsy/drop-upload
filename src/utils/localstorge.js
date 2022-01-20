export const removeItem = key => {
  localStorage.removeItem(key)
}

export const setItem = (key, value) => {
  if (typeof value === 'undefined') {
    removeItem(key)
  } else {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }
}

export const getItem = key => {
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error(e)
  }
  return undefined
}
