export const filterObject = base => obj => {
  const filtered = {}

  for (const prop in base) {
    if (Object.prototype.hasOwnProperty.call(base, prop)) { filtered[prop] = obj[prop] || base[prop] }
  }

  return filtered
}
