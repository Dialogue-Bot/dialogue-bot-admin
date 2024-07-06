const generateString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const arrayToObj = (arr) => {
  const obj = {}
  arr.forEach((item) => {
    obj[item.key] = item.value
  })
  return obj
}
export { arrayToObj, generateString };

