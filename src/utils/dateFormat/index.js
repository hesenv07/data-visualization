import moment from "moment"

export const changeLocale = (locale) => moment.locale(locale || 'en')

export const getDateFormat = (date, format = 'll') => moment(date).format(format)

export const increaseDate = (date, amount, unit) => moment(date).add(amount, unit).toDate()