import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form() {

    const { state, dispatch } = useActivity()

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleForm = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const isNumber = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id] : isNumber ? +e.target.value : e.target.value
        })
    }

    const formValidation = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        setActivity({...initialState, id: uuidv4()})
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleForm}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">{activity.category === 1 ? 'Food' : 'Exercise'}</label>
                <input
                    type="text"
                    id="name"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder={activity.category === 1 ? 'salad, orange juice, apple.' : 'pull-ups, squads, bicycle.'}
                    value={activity.name}
                    onChange={handleForm}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories</label>
                <input
                    type="number"
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories: 300, 500, etc"
                    value={activity.calories}
                    onChange={handleForm}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white disabled:bg-gray-400 cursor-pointer"
                value={activity.category === 1 ? 'Save food' : 'Save exercise'}
                disabled={!formValidation()}
            />
        </form>
    )
}