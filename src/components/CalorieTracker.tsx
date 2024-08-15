import { useMemo } from "react"
import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"


export default function CalorieTracker() {

    const { state } = useActivity()

    const caloriesConsumed = useMemo( () => state.activities.reduce( (total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])
    const caloriesBurned = useMemo( () => state.activities.reduce( (total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])
    const netCalories = useMemo( () => caloriesConsumed - caloriesBurned , [caloriesConsumed, caloriesBurned])

  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Calories panel</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
            <CalorieDisplay
                calories={caloriesConsumed}
                text='Consumed'
                color='text-lime-600'
            />
            <CalorieDisplay
                calories={caloriesBurned}
                text='Burned'
                color='text-orange-600'
            />
            <CalorieDisplay
                calories={netCalories}
                text='Net'
            />
        </div>
    </>
  )
}
