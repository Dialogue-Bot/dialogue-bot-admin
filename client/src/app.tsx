import { Outlet } from 'react-router-dom'

console.log(process.env)

const App = () => {
  return (
    <div>
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      <Outlet />
    </div>
  )
}

export default App
