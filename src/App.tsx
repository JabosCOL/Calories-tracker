import { useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from "./hooks/useActivity"


function App() {

  const { state, dispatch } = useActivity()

  useEffect( () => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canResetApp = useMemo(() => state.activities.length, [state.activities])

  const handleReset = () => {
    const confirmReset = confirm('Do you really want to delete all your calory data?')
    confirmReset && dispatch({type: 'reset-app'})
  }

  return (
    <>
      <header className="bg-lime-600 py-3 px-5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Calorie tracker</h1>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg uppercase font-bold text-sm disabled:opacity-10"
            disabled={!canResetApp}
            onClick={handleReset}
          >
            Reset app
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="p-10 m-auto max-w-4xl">
        <ActivityList />
      </section>
    </>
  )
}

export default App
