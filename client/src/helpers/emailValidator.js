export function emailValidator(email) {
  if (!email) return "Email can't be empty."
  const re = /\S+@\S+\.\S+/
  return ''
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}
