export default function Home() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
          Good morning! ☀️
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-dark-gray)' }}>
          Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
          🌿 Ready to Plan This Week?
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-dark-gray)' }}>
          Let&apos;s create your weekly meal plan! It takes just 10 minutes to answer a few questions.
        </p>
        <button className="btn-primary">
          Start Questionnaire
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-off-black)' }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">📖</div>
            <div className="font-medium">Browse Recipes</div>
          </div>
          <div className="card p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-2">🛒</div>
            <div className="font-medium">Add Items</div>
          </div>
        </div>
      </div>
    </div>
  );
}
