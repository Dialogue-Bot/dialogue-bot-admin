export interface IButton {
  type: 'postback' | 'web_url'
  title: string
  payload?: string
  url?: string
}

export interface ICard {
  title: string
  subtitle: string
  image_url: string
  buttons: IButton[]
}
