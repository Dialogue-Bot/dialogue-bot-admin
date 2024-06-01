;(function () {
  const c = document.createElement('link').relList
  if (c && c.supports && c.supports('modulepreload')) return
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) e(o)
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === 'childList')
        for (const t of r.addedNodes)
          t.tagName === 'LINK' && t.rel === 'modulepreload' && e(t)
  }).observe(document, { childList: !0, subtree: !0 })
  function l(o) {
    const r = {}
    return (
      o.integrity && (r.integrity = o.integrity),
      o.referrerPolicy && (r.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : o.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    )
  }
  function e(o) {
    if (o.ep) return
    o.ep = !0
    const r = l(o)
    fetch(o.href, r)
  }
})()
;(function () {
  var u, g, b, m, h, f, x, v, M, C, w
  const a =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib3QtbWVzc2FnZS1zcXVhcmUiPjxwYXRoIGQ9Ik0xMiA2VjJIOCIvPjxwYXRoIGQ9Im04IDE4LTQgNFY4YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY4YTIgMiAwIDAgMS0yIDJaIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik05IDExdjIiLz48cGF0aCBkPSJNMTUgMTF2MiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PC9zdmc+',
    c =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14Ij48cGF0aCBkPSJNMTggNiA2IDE4Ii8+PHBhdGggZD0ibTYgNiAxMiAxMiIvPjwvc3ZnPg==',
    l =
      ((u = document.currentScript) == null
        ? void 0
        : u.getAttribute('channelId')) ||
      ((g = document.currentScript) == null ? void 0 : g.getAttribute('id')) ||
      ((m = (b = document.currentScript) == null ? void 0 : b.dataset) == null
        ? void 0
        : m.channelId)
  let e =
    ((h = document.currentScript) == null
      ? void 0
      : h.getAttribute('custom')) ||
    ((x = (f = document.currentScript) == null ? void 0 : f.dataset) == null
      ? void 0
      : x.custom)
  e = e ? JSON.parse(e) : {}
  const o = 'https://chatbox.dialoguebot.tech?channelId=' + l
  let r = !1
  const t = document.createElement('button')
  ;(t.id = 'dialogue-bot-toggle-button'),
    (t.style.position = 'fixed'),
    (t.style.bottom = `${
      ((v = e == null ? void 0 : e.position) == null ? void 0 : v.y) || 24
    }px`),
    (t.style.right = `${
      ((M = e == null ? void 0 : e.position) == null ? void 0 : M.x) || 24
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
  const s = document.createElement('img')
  ;(s.src = a),
    (s.style.width = '24px'),
    (s.style.height = '24px'),
    t.appendChild(s),
    document.body.appendChild(t)
  const i = document.createElement('div')
  ;(i.id = 'dialoguebot-chatbox'),
    (i.style.display = 'none'),
    (i.style.position = 'absolute'),
    (i.style.bottom = 'calc(100% + 10px)'),
    (i.style.right = '0'),
    (i.style.width = `${
      ((C = e == null ? void 0 : e.windowSize) == null ? void 0 : C.width) ||
      320
    }px`),
    (i.style.height = `${
      ((w = e == null ? void 0 : e.windowSize) == null ? void 0 : w.height) ||
      500
    }px`),
    (i.style.zIndex = '999'),
    (i.style.borderRadius = '6px'),
    (i.style.overflow = 'hidden'),
    (i.style.transition = 'all 0.3s ease-in-out')
  const n = document.createElement('iframe')
  ;(n.id = 'iframeChatBox'),
    (n.src = o),
    (n.style.width = '100%'),
    (n.style.height = '100%'),
    (n.style.border = '0'),
    (n.style.backgroundColor = 'transparent'),
    i.appendChild(n),
    t.appendChild(i)
  const I = document.querySelector('#dialogue-bot-toggle-button'),
    y = () => {
      r
        ? ((i.style.opacity = '0'),
          (i.style.visibility = 'hidden'),
          (s.src = a),
          setTimeout(() => {
            i.style.display = 'none'
          }, 300))
        : ((i.style.opacity = '1'),
          (i.style.visibility = 'visible'),
          (i.style.display = 'block'),
          (i.style.boxShadow =
            ' 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'),
          (s.src = c)),
        (r = !r)
    }
  I == null || I.addEventListener('click', y),
    window.addEventListener(
      'message',
      (p) => {
        p.data.type === 'TOGGLE_CHAT' && y()
      },
      !1,
    )
  const d = document.getElementById(l),
    N = d == null ? void 0 : d.parentNode,
    P = new MutationObserver((p) => {
      p.forEach((A) => {
        if (A.removedNodes) {
          if (!d) return
          Array.from(A.removedNodes).includes(d) && (t.remove(), i.remove())
        }
      })
    })
  N && P.observe(d.parentNode, { childList: !0 })
})()
