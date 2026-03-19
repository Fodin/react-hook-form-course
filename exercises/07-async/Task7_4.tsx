import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLanguage } from 'src/hooks';

// ============================================
// Задание 7.4: Debounce
// Task 7.4: Debounce
// ============================================

// TODO: Определите интерфейс DraftForm
// TODO: Define DraftForm interface

// TODO: Получите savedDraft из localStorage
// TODO: Get savedDraft from localStorage

// TODO: Инициализируйте useForm<DraftForm> с defaultValues из localStorage
// TODO: Initialize useForm<DraftForm> with defaultValues from localStorage

// TODO: Получите значения через watch
// TODO: Get values via watch

// TODO: Создайте состояния для статуса сохранения
// TODO: Create save status state

// TODO: Используйте useEffect с setTimeout для debounce
// TODO: Use useEffect with setTimeout for debounce

export function Task7_4() {
  const { t } = useLanguage();

  return (
    <div className="exercise-container">
      <h2>{t('task.7.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  );
}
