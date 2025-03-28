import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const fetchNotes = async() => {
      try{
        const response = await fetch('https://notesapp-production-7ea8.up.railway.app/notes')
        if(!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
      const json = await response.json();
      console.log(json);
      }catch (error) {
        console.log(error);
        
      }
    }
    fetchNotes()
  }, [])
  return (
    <>
    </>
  )
}

export default App
