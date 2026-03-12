import { useState } from 'react'
import { Task8_1_Template, Task8_2_Template, Task8_3_Template, Task8_4_Template, Task8_5_Template } from './Template'
import { Task8_1_Solution, Task8_2_Solution, Task8_3_Solution, Task8_4_Solution, Task8_5_Solution } from './Solution'

type Task = '8.1' | '8.2' | '8.3' | '8.4' | '8.5'

export function AdvancedExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('8.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates: Record<Task, React.ReactNode> = {
    '8.1': <Task8_1_Template />,
    '8.2': <Task8_2_Template />,
    '8.3': <Task8_3_Template />,
    '8.4': <Task8_4_Template />,
    '8.5': <Task8_5_Template />,
  }

  const solutions: Record<Task, React.ReactNode> = {
    '8.1': <Task8_1_Solution />,
    '8.2': <Task8_2_Solution />,
    '8.3': <Task8_3_Solution />,
    '8.4': <Task8_4_Solution />,
    '8.5': <Task8_5_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '8.1', name: 'UI-библиотека' },
    { id: '8.2', name: 'Кастомный хук' },
    { id: '8.3', name: 'FormContext' },
    { id: '8.4', name: 'localStorage' },
    { id: '8.5', name: 'Финальный' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 8: Продвинутые Техники
        </h1>
        <p style={{ color: '#6c757d' }}>
          UI интеграция, кастомные хуки, context, persistence, финальный проект
        </p>
      </header>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setCurrentTask(task.id)}
            style={{
              background: currentTask === task.id ? '#646cff' : '#ffffff',
              color: currentTask === task.id ? '#fff' : '#213547',
              border: currentTask === task.id ? '2px solid #646cff' : '1px solid #ddd',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: currentTask === task.id ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (currentTask !== task.id) {
                e.currentTarget.style.borderColor = '#646cff'
                e.currentTarget.style.background = '#f0f0ff'
              }
            }}
            onMouseLeave={(e) => {
              if (currentTask !== task.id) {
                e.currentTarget.style.borderColor = '#ddd'
                e.currentTarget.style.background = '#ffffff'
              }
            }}
          >
            {task.name}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            background: showSolution ? '#28a745' : '#646cff',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {showSolution ? '🙈 Скрыть решение' : '💡 Показать решение'}
        </button>
      </div>

      {showSolution ? solutions[currentTask] : templates[currentTask]}

      <section style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📚 Теория</h2>
        <div style={{ lineHeight: 1.8 }}>
          <h3>Controller</h3>
          <p>
            Компонент для интеграции контролируемых компонентов (UI-библиотеки) с react-hook-form.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Кастомные хуки</h3>
          <p>
            Создавайте переиспользуемые хуки для общей логики, например useFormPersist для localStorage.
          </p>

          <h3 style={{ marginTop: '1rem' }}>FormContext</h3>
          <p>
            FormProvider и useFormContext позволяют разделять форму на подкомпоненты без прокидывания props.
          </p>

          <h3 style={{ marginTop: '1rem' }}>localStorage Persistence</h3>
          <p>
            Сохраняйте данные формы в localStorage для восстановления после перезагрузки страницы.
          </p>
        </div>
      </section>
    </div>
  )
}
