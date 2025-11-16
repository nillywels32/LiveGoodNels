'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm';

export default function QuestionnairePage() {
  return (
    <ProtectedRoute>
      <QuestionnaireForm />
    </ProtectedRoute>
  );
}
