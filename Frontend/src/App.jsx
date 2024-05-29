import { useState } from 'react'
import { Button } from './components/ui/button'
import Home from './Landing/home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

    <Home/>
    

    </div>
  )
}

export default App
