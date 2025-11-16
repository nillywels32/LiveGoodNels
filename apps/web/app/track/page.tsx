export default function TrackPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
          Track Progress 📊
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-dark-gray)' }}>
          Monitor your nutrition journey and meal feedback
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-6">
          <div className="text-4xl mb-2">🔥</div>
          <h3 className="text-lg font-semibold mb-1">Streak</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-forest-green)' }}>
            0 days
          </p>
          <p className="text-sm" style={{ color: 'var(--color-dark-gray)' }}>
            No eating out
          </p>
        </div>

        <div className="card p-6">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-lg font-semibold mb-1">This Week</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-forest-green)' }}>
            0/21
          </p>
          <p className="text-sm" style={{ color: 'var(--color-dark-gray)' }}>
            Meals completed
          </p>
        </div>

        <div className="card p-6">
          <div className="text-4xl mb-2">⭐</div>
          <h3 className="text-lg font-semibold mb-1">Rating</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-forest-green)' }}>
            N/A
          </p>
          <p className="text-sm" style={{ color: 'var(--color-dark-gray)' }}>
            Average satisfaction
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
          Recent Feedback
        </h2>
        <div className="text-center py-12">
          <div className="text-5xl mb-4">💭</div>
          <p style={{ color: 'var(--color-dark-gray)' }}>
            No feedback yet. Start rating your meals!
          </p>
        </div>
      </div>
    </div>
  );
}
