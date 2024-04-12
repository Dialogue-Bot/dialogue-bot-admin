;(function () {
  const l = document.createElement('link').relList
  if (l && l.supports && l.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) d(i)
  new MutationObserver((i) => {
    for (const e of i)
      if (e.type === 'childList')
        for (const o of e.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && d(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(i) {
    const e = {}
    return (
      i.integrity && (e.integrity = i.integrity),
      i.referrerPolicy && (e.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (e.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (e.credentials = 'omit')
        : (e.credentials = 'same-origin'),
      e
    )
  }
  function d(i) {
    if (i.ep) return
    i.ep = !0
    const e = n(i)
    fetch(i.href, e)
  }
})()
;(function () {
  var u, m
  const c =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib3QtbWVzc2FnZS1zcXVhcmUiPjxwYXRoIGQ9Ik0xMiA2VjJIOCIvPjxwYXRoIGQ9Im04IDE4LTQgNFY4YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY4YTIgMiAwIDAgMS0yIDJaIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik05IDExdjIiLz48cGF0aCBkPSJNMTUgMTF2MiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PC9zdmc+',
    l =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14Ij48cGF0aCBkPSJNMTggNiA2IDE4Ii8+PHBhdGggZD0ibTYgNiAxMiAxMiIvPjwvc3ZnPg==',
    n =
      ((u = document.currentScript) == null
        ? void 0
        : u.getAttribute('channelId')) ||
      ((m = document.currentScript) == null ? void 0 : m.getAttribute('id')),
    d = 'http://localhost:5175?channelId=' + n
  let i = !0
  const e = document.createElement('button')
  ;(e.id = 'dialogue-bot-toggle-button'),
    (e.style.position = 'fixed'),
    (e.style.bottom = '24px'),
    (e.style.right = '24px'),
    (e.style.height = '40px'),
    (e.style.width = '40px'),
    (e.style.cursor = 'pointer'),
    (e.style.border = 'none'),
    (e.style.outline = 'none'),
    (e.style.borderRadius = '6px'),
    (e.style.backgroundColor = '#2563eb'),
    (e.style.color = '#fff'),
    (e.style.display = 'flex'),
    (e.style.alignItems = 'center'),
    (e.style.justifyItems = 'center'),
    (e.style.justifyContent = 'center')
  const o = document.createElement('img')
  ;(o.src = c),
    (o.style.width = '24px'),
    (o.style.height = '24px'),
    e.appendChild(o),
    document.body.appendChild(e)
  const t = document.createElement('div')
  ;(t.id = 'dialoguebot-chatbox'),
    (t.style.display = 'block'),
    (t.style.position = 'absolute'),
    (t.style.bottom = 'calc(100% + 10px)'),
    (t.style.right = '0'),
    (t.style.width = '320px'),
    (t.style.height = '500px'),
    (t.style.zIndex = '999'),
    (t.style.borderRadius = '6px'),
    (t.style.overflow = 'hidden'),
    (t.style.transition = 'all 0.3s ease-in-out')
  const r = document.createElement('iframe')
  ;(r.id = 'iframeChatBox'),
    (r.src = d),
    (r.style.width = '100%'),
    (r.style.height = '100%'),
    (r.style.border = '0'),
    (r.style.backgroundColor = 'transparent'),
    t.appendChild(r),
    e.appendChild(t)
  const a = document.querySelector('#dialogue-bot-toggle-button'),
    I = () => {
      i
        ? ((t.style.opacity = '0'),
          (t.style.visibility = 'hidden'),
          (o.src = c),
          setTimeout(() => {
            t.style.display = 'none'
          }, 300))
        : ((t.style.opacity = '1'),
          (t.style.visibility = 'visible'),
          (t.style.display = 'block'),
          (t.style.boxShadow =
            ' 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'),
          (o.src = l)),
        (i = !i)
    }
  a == null || a.addEventListener('click', I),
    window.addEventListener(
      'message',
      (y) => {
        y.data.type === 'TOGGLE_CHAT' && I()
      },
      !1,
    )
  const s = document.getElementById(n),
    g = s == null ? void 0 : s.parentNode
  console.log(s, s == null ? void 0 : s.parentNode)
  const b = new MutationObserver((y) => {
    y.forEach((p) => {
      if (p.removedNodes) {
        if (!s) return
        Array.from(p.removedNodes).includes(s) && (e.remove(), t.remove())
      }
    })
  })
  g && b.observe(s.parentNode, { childList: !0 })
})()
