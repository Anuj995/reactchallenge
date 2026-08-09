interface StatsPanelProps {
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel({
  total = 0,
  completed = 0,
  active = 0,
  overdue = 0,
  completedPercentage = 0,
}: StatsPanelProps) {
  return (
    <section id="stats-panel">
      <h3>Task Statistics</h3>

      <p>Total Tasks: {total}</p>

      <p>
        Completed: {completed} ({completedPercentage}%)
      </p>

      <p>Active: {active}</p>

      <p>Overdue: {overdue}</p>

      <div
        role="progressbar"
        aria-valuenow={completedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#ddd",
        }}
      >
        <div
          style={{
            width: `${completedPercentage}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </div>
    </section>
  )
}