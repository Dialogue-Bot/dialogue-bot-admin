;(function () {
  const l = document.createElement('link').relList
  if (l && l.supports && l.supports('modulepreload')) return
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) e(o)
  new MutationObserver((o) => {
    for (const n of o)
      if (n.type === 'childList')
        for (const t of n.addedNodes)
          t.tagName === 'LINK' && t.rel === 'modulepreload' && e(t)
  }).observe(document, { childList: !0, subtree: !0 })
  function c(o) {
    const n = {}
    return (
      o.integrity && (n.integrity = o.integrity),
      o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : o.crossOrigin === 'anonymous'
        ? (n.credentials = 'omit')
        : (n.credentials = 'same-origin'),
      n
    )
  }
  function e(o) {
    if (o.ep) return
    o.ep = !0
    const n = c(o)
    fetch(o.href, n)
  }
})()
;(function () {
  var g, u, b, m, h, f, x
  const a =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib3QtbWVzc2FnZS1zcXVhcmUiPjxwYXRoIGQ9Ik0xMiA2VjJIOCIvPjxwYXRoIGQ9Im04IDE4LTQgNFY4YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY4YTIgMiAwIDAgMS0yIDJaIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik05IDExdjIiLz48cGF0aCBkPSJNMTUgMTF2MiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PC9zdmc+',
    l =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14Ij48cGF0aCBkPSJNMTggNiA2IDE4Ii8+PHBhdGggZD0ibTYgNiAxMiAxMiIvPjwvc3ZnPg==',
    c =
      ((g = document.currentScript) == null
        ? void 0
        : g.getAttribute('channelId')) ||
      ((u = document.currentScript) == null ? void 0 : u.getAttribute('id'))
  let e =
    (b = document.currentScript) == null ? void 0 : b.getAttribute('custom')
  console.log({ channelId: c, customStyle: e }), (e = e ? JSON.parse(e) : {})
  const o = 'https://chatbox.dialoguebot.tech?channelId=' + c
  let n = !1
  const t = document.createElement('button')
  ;(t.id = 'dialogue-bot-toggle-button'),
    (t.style.position = 'fixed'),
    (t.style.bottom = `${
      ((m = e == null ? void 0 : e.position) == null ? void 0 : m.y) || 24
    }px`),
    (t.style.right = `${
      ((h = e == null ? void 0 : e.position) == null ? void 0 : h.x) || 24
    }px`),
    (t.style.height = `${(e == null ? void 0 : e.buttonSize) || 48}px`),
    (t.style.width = `${(e == null ? void 0 : e.buttonSize) || 48}px`),
    (t.style.cursor = 'pointer'),
    (t.style.border = 'none'),
    (t.style.outline = 'none'),
    (t.style.borderRadius = '6px'),
    (t.style.backgroundColor = `${
      (e == null ? void 0 : e.color) || '#1890ff'
    }`),
    (t.style.color = '#fff'),
    (t.style.display = 'flex'),
    (t.style.alignItems = 'center'),
    (t.style.justifyItems = 'center'),
    (t.style.justifyContent = 'center')
  const d = document.createElement('img')
  ;(d.src = a),
    (d.style.width = '24px'),
    (d.style.height = '24px'),
    t.appendChild(d),
    document.body.appendChild(t)
  const i = document.createElement('div')
  ;(i.id = 'dialoguebot-chatbox'),
    (i.style.display = 'none'),
    (i.style.position = 'absolute'),
    (i.style.bottom = 'calc(100% + 10px)'),
    (i.style.right = '0'),
    (i.style.width = `${
      ((f = e == null ? void 0 : e.windowSize) == null ? void 0 : f.width) ||
      320
    }px`),
    (i.style.height = `${
      ((x = e == null ? void 0 : e.windowSize) == null ? void 0 : x.height) ||
      500
    }px`),
    (i.style.zIndex = '999'),
    (i.style.borderRadius = '6px'),
    (i.style.overflow = 'hidden'),
    (i.style.transition = 'all 0.3s ease-in-out')
  const s = document.createElement('iframe')
  ;(s.id = 'iframeChatBox'),
    (s.src = o),
    (s.style.width = '100%'),
    (s.style.height = '100%'),
    (s.style.border = '0'),
    (s.style.backgroundColor = 'transparent'),
    i.appendChild(s),
    t.appendChild(i)
  const I = document.querySelector('#dialogue-bot-toggle-button'),
    p = () => {
      n
        ? ((i.style.opacity = '0'),
          (i.style.visibility = 'hidden'),
          (d.src = a),
          setTimeout(() => {
            i.style.display = 'none'
          }, 300))
        : ((i.style.opacity = '1'),
          (i.style.visibility = 'visible'),
          (i.style.display = 'block'),
          (i.style.boxShadow =
            ' 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'),
          (d.src = l)),
        (n = !n)
    }
  I == null || I.addEventListener('click', p),
    window.addEventListener(
      'message',
      (y) => {
        y.data.type === 'TOGGLE_CHAT' && p()
      },
      !1,
    )
  const r = document.getElementById(c),
    M = r == null ? void 0 : r.parentNode
  console.log(r, r == null ? void 0 : r.parentNode)
  const C = new MutationObserver((y) => {
    y.forEach((v) => {
      if (v.removedNodes) {
        if (!r) return
        Array.from(v.removedNodes).includes(r) && (t.remove(), i.remove())
      }
    })
  })
  M && C.observe(r.parentNode, { childList: !0 })
})()
