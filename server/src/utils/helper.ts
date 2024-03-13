import moment from 'moment'

export class Helper {
  public static formatDate(date: Date) {
    if (!date) return null
    return moment(date).format('DD/MM/YYYY HH:mm:ss')
  }

  public static arrayToObj(arr) {
    const obj = {}
    arr.forEach((item) => {
      obj[item.key] = item.value
    })
    return obj
  }
}
