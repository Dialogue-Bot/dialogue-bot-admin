import { Outlet } from 'react-router-dom'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = () => {
  return (
    <div>
      <ReactQueryDevtools />
      <Outlet />
    </div>
  )
}

export default App
