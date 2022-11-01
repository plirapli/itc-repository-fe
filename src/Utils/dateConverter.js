const showFormattedDate = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export { showFormattedDate };
