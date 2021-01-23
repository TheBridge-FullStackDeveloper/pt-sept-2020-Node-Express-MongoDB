const { isInvalidDate } = require('./common.utils');

const createBirthDate = (initDate) => {
  let date = new Date(initDate);

  if (isInvalidDate(date)) {
    const splitDate = (initDate || '').split(/[-\/]/gi);

    if (splitDate.length === 3) {
      // El formato de la fecha está en español
      const day = splitDate[0];
      const month = splitDate[1];
      const year = splitDate[2];

      const newDate = new Date();
      newDate.setDate(day);
      newDate.setMonth(month - 1);
      newDate.setFullYear(year);

      if (!isInvalidDate(newDate)) {
        date = newDate;
      } else {
        date = null;
      }
    } else {
      date = null;
    }
  }

  return date;
};

module.exports = {
  createBirthDate,
};
