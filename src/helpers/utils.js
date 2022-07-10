const getDateTime = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date(Date.now());
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

module.exports = {
  getDateTime,
};
