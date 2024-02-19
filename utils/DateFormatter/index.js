function createDateFormatter() {
  const format = (date) => {
    return new Date(date).toLocaleString();
  };

  return Object.freeze({
    format,
  });
}

const DateFormatter = createDateFormatter();
export default DateFormatter;
