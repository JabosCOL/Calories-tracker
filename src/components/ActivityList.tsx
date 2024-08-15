import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { useActivity } from "../hooks/useActivity"

export default function ActivityList() {

  const { state, dispatch } = useActivity()

  const categoryName = useMemo(() =>
    (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
    , [state.activities])

  const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

  return (
    <>
      <h2 className="font-bold text-4xl text-center text-slate-600 mb-10">
        Food and activity
      </h2>
      {!isEmptyActivities ?
        state.activities.map(activity => (
          <div
            key={activity.id}
            className="bg-white px-5 py-10 mt-5 rounded-lg flex justify-between shadow"
          >
            <div className="space-y-2 relative">
              <p className={`absolute -top-8 -left-8 px-10 py-1 rounded-e-lg text-white font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                {categoryName(+activity.category)}
              </p>
              <p className="font-bold text-2xl pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {`${activity.calories} Calories`}
              </p>
            </div>
            <div className="flex gap-5 text-center">
              <button
                onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
              >
                <PencilSquareIcon
                  className="h-8 w-8 text-gray-800"
                />
              </button>
              <button
                onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
              >
                <XCircleIcon
                  className="h-8 w-8 text-red-500"
                />
              </button>
            </div>
          </div>
        )) : (<p className="text-center mt-5">Start adding your calories! 🍎💪</p>)
      }
    </>
  )
}
