export const parseDate = (date: Date) => {
  const updatedDate = Date.parse(`${date}`)
  const  options: Intl.DateTimeFormatOptions  = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return new Intl.DateTimeFormat('en-US', options).format(updatedDate)
}