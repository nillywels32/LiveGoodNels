export default function ShopPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
          Shopping List 🛒
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-dark-gray)' }}>
          Your weekly shopping list and inventory
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Shopping List
          </h2>
          <div className="text-center py-8">
            <div className="text-5xl mb-4">📝</div>
            <p style={{ color: 'var(--color-dark-gray)' }}>
              No shopping list yet. Generate a meal plan first.
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Inventory
          </h2>
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🥬</div>
            <p style={{ color: 'var(--color-dark-gray)' }}>
              Track what you have in your kitchen
            </p>
            <button className="btn-secondary mt-4">
              Add Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
