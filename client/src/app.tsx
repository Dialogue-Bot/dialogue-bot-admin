import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      <Outlet />
    </div>
  )
}

export default App
