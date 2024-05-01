import CliTable from 'cli-table'
import { Router } from 'express'
export const printRoute = (router: Router) => {
  const table = new CliTable({
    head: ['Method', 'Path'],
  })

  router.stack.forEach((r) => {
    if (r.route) {
      r.route.stack.forEach((s) => {
        if (
          table.some((t) => t[0] === r.route.stack[0].method.toUpperCase()) &&
          table.some((t) => t[1] === r.route.path)
        ) {
        } else {
          table.push([r.route.stack[0].method.toUpperCase(), r.route.path])
        }
      })
    }
  })
  console.log(table.toString())
}
