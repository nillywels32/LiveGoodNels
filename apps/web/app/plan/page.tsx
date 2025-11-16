export default function PlanPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
          Meal Plan 📅
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-dark-gray)' }}>
          Your weekly meal planning dashboard
        </p>
      </div>

      <div className="card p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold mb-2">No Meal Plan Yet</h2>
          <p className="mb-6" style={{ color: 'var(--color-dark-gray)' }}>
            Complete the weekly questionnaire to generate your personalized meal plan
          </p>
          <button className="btn-primary">
            Start Questionnaire
          </button>
        </div>
      </div>
    </div>
  );
}
