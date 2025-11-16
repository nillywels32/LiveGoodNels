export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
          Settings ⚙️
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-dark-gray)' }}>
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Family Name</label>
              <input
                type="text"
                placeholder="The Nels Family"
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: 'var(--color-light-gray)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="family@example.com"
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: 'var(--color-light-gray)' }}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Family
          </h2>
          <p className="mb-4" style={{ color: 'var(--color-dark-gray)' }}>
            2 adults, 2 kids (ages 2, 3)
          </p>
          <button className="btn-secondary">
            Manage Family Members
          </button>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Nutrition Preferences
          </h2>
          <p className="mb-4" style={{ color: 'var(--color-dark-gray)' }}>
            Philosophy: Go Back to Nature • Top 15 Foods • Macro Targets
          </p>
          <button className="btn-secondary">
            Edit Preferences
          </button>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span>Saturday Questionnaire (10:00 AM)</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>Daily Morning Check-in (9:00 AM)</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>Evening Prep Reminders (9:00 PM)</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-forest-green)' }}>
            Account
          </h2>
          <div className="space-y-2">
            <button className="text-blue-600 hover:underline block">Change Password</button>
            <button className="text-blue-600 hover:underline block">Privacy Policy</button>
            <button className="text-red-600 hover:underline block">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
