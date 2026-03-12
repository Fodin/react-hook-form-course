import { useState } from 'react'
import { Task5_1_Template, Task5_2_Template, Task5_3_Template, Task5_4_Template } from './Template'
import { Task5_1_Solution, Task5_2_Solution, Task5_3_Solution, Task5_4_Solution } from './Solution'

type Task = '5.1' | '5.2' | '5.3' | '5.4'

export function DynamicFormsExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('5.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates: Record<Task, React.ReactNode> = {
    '5.1': <Task5_1_Template />,
    '5.2': <Task5_2_Template />,
    '5.3': <Task5_3_Template />,
    '5.4': <Task5_4_Template />,
  }

  const solutions: Record<Task, React.ReactNode> = {
    '5.1': <Task5_1_Solution />,
    '5.2': <Task5_2_Solution />,
    '5.3': <Task5_3_Solution />,
    '5.4': <Task5_4_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '5.1', name: 'useFieldArray' },
    { id: '5.2', name: 'Условные поля' },
    { id: '5.3', name: 'Зависимые поля' },
    { id: '5.4', name: 'Wizard' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 5: Динамические формы
        </h1>
        <p style={{ color: '#6c757d' }}>
          useFieldArray, conditional fields, dependent fields, wizard
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
            Задание {task.id}
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
          <h3>useFieldArray</h3>
          <p>
            Хук для работы с динамическими массивами полей. Позволяет добавлять, удалять, перемещать поля.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Условные поля</h3>
          <p>
            Используйте watch для отслеживания значения и условный рендеринг для отображения нужных полей.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Зависимые поля</h3>
          <p>
            Поля, значения которых зависят от других полей. При изменении родителя сбрасывайте дочернее поле.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Wizard (multi-step)</h3>
          <p>
            Многошаговые формы с валидацией на каждом шаге. Используйте trigger для проверки перед переходом.
          </p>
        </div>
      </section>
    </div>
  )
}
