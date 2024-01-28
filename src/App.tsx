import { MouseEvent } from 'react'
import './App.css'
import Button from './components/Button/Button'
import Input from './components/input/input'





function App() {
  const addCounter = (e: MouseEvent) => {
    console.log(e)
  }

  return (
    <>
      <Button apperence='small' onClick={addCounter}>
        конопка
      </Button>
      <Button apperence='big' onClick={addCounter}>
        конопка
      </Button>
      <Input placeholder='Email' />
    
      
    </>
  )
}
export default App
