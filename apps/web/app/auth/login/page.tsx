'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {mode === 'login' ? (
        <LoginForm onToggleMode={() => setMode('signup')} />
      ) : (
        <SignupForm onToggleMode={() => setMode('login')} />
      )}
    </div>
  );
}
