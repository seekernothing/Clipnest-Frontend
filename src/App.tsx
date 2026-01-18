
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {
 

  return (
    <>
     <h2>Hello ji hello</h2>
     <Button startIcon={<PlusIcon/>} text='Hello Ji Hello'></Button>
     <Button  text='Frontend is harder than backend'></Button>
    </>
  )
}

export default App
