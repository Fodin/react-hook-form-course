import { useState } from 'react'
import { ThemeProvider, useTheme } from './hooks/useTheme'
import { ThemeToggle } from './components/ThemeToggle'
import { SetupExercise } from './exercises/00-setup/SetupExercise'
import { BasicFormExercise } from './exercises/01-basic-form/BasicFormExercise'
import { ValidationExercise } from './exercises/02-validation/ValidationExercise'
import { SchemaValidationExercise } from './exercises/03-schema-validation/SchemaValidationExercise'
import { ComplexFieldsExercise } from './exercises/04-complex-fields/ComplexFieldsExercise'
import { DynamicFormsExercise } from './exercises/05-dynamic-forms/DynamicFormsExercise'
import { StatesUXExercise } from './exercises/06-states-ux/StatesUXExercise'
import { AsyncExercise } from './exercises/07-async/AsyncExercise'
import { AdvancedExercise } from './exercises/08-advanced/AdvancedExercise'

type Level = 
  | '0' 
  | '1' 
  | '2' 
  | '3' 
  | '4' 
  | '5' 
  | '6' 
  | '7' 
  | '8'

const levels: { id: Level; name: string; description: string }[] = [
  { id: '0', name: 'Setup', description: 'Настройка и первая форма' },
  { id: '1', name: 'Основы', description: 'useForm, register, handleSubmit' },
  { id: '2', name: 'Валидация', description: 'Built-in и custom валидация' },
  { id: '3', name: 'Схемы', description: 'Zod и Yup валидация' },
  { id: '4', name: 'Сложные поля', description: 'Controller, file upload' },
  { id: '5', name: 'Динамические', description: 'useFieldArray, wizard' },
  { id: '6', name: 'UX', description: 'Dirty, reset, a11y, performance' },
  { id: '7', name: 'Асинхронность', description: 'Async validation, API' },
  { id: '8', name: 'Продвинутые', description: 'Интеграции и финальный проект' },
]

function AppContent() {
  const [currentLevel, setCurrentLevel] = useState<Level>('0')
  const { theme } = useTheme()

  const renderExercise = () => {
    switch (currentLevel) {
      case '0':
        return <SetupExercise />
      case '1':
        return <BasicFormExercise />
      case '2':
        return <ValidationExercise />
      case '3':
        return <SchemaValidationExercise />
      case '4':
        return <ComplexFieldsExercise />
      case '5':
        return <DynamicFormsExercise />
      case '6':
        return <StatesUXExercise />
      case '7':
        return <AsyncExercise />
      case '8':
        return <AdvancedExercise />
      default:
        return <SetupExercise />
    }
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      gap: '2rem',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row'
    }}>
      <aside style={{
        width: window.innerWidth < 768 ? '100%' : '280px',
        flexShrink: 0
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem' 
        }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>📚 Уровни</h2>
          <ThemeToggle />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setCurrentLevel(level.id)}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                background: currentLevel === level.id ? '#646cff' : theme === 'dark' ? '#161b22' : '#ffffff',
                color: currentLevel === level.id ? '#fff' : theme === 'dark' ? '#e6edf3' : '#213547',
                border: currentLevel === level.id ? '2px solid #646cff' : '1px solid #30363d',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: currentLevel === level.id ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (currentLevel !== level.id) {
                  e.currentTarget.style.borderColor = '#646cff'
                  e.currentTarget.style.background = theme === 'dark' ? '#21262d' : '#f8f9fa'
                }
              }}
              onMouseLeave={(e) => {
                if (currentLevel !== level.id) {
                  e.currentTarget.style.borderColor = '#30363d'
                  e.currentTarget.style.background = theme === 'dark' ? '#161b22' : '#ffffff'
                }
              }}
            >
              <div style={{ fontWeight: 600 }}>Уровень {level.id}: {level.name}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{level.description}</div>
            </button>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        {renderExercise()}
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
