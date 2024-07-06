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


  public static generateString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
