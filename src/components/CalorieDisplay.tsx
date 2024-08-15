type CalorieDisplayProps = {
    calories: number,
    text: string,
    color?: string
}

export default function CalorieDisplay({calories, text, color = ''} : CalorieDisplayProps) {
    return (
        <p className="font-bold text-center text-white grid grid-cols-1 gap-3">
            <span className={`font-black text-6xl ${color}`}>{calories}</span>
            {text}
        </p>
    )
}
