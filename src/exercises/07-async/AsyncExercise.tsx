import { useState } from 'react'
import { Task7_1_Template, Task7_2_Template, Task7_3_Template, Task7_4_Template } from './Template'
import { Task7_1_Solution, Task7_2_Solution, Task7_3_Solution, Task7_4_Solution } from './Solution'

type Task = '7.1' | '7.2' | '7.3' | '7.4'

export function AsyncExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('7.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates: Record<Task, React.ReactNode> = {
    '7.1': <Task7_1_Template />,
    '7.2': <Task7_2_Template />,
    '7.3': <Task7_3_Template />,
    '7.4': <Task7_4_Template />,
  }

  const solutions: Record<Task, React.ReactNode> = {
    '7.1': <Task7_1_Solution />,
    '7.2': <Task7_2_Solution />,
    '7.3': <Task7_3_Solution />,
    '7.4': <Task7_4_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '7.1', name: 'Async валидация' },
    { id: '7.2', name: 'Загрузка данных' },
    { id: '7.3', name: 'Submit loading/error' },
    { id: '7.4', name: 'Debounce' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 7: Асинхронность
        </h1>
        <p style={{ color: '#6c757d' }}>
          async validation, API loading, error handling, debounce
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
          <h3>Async валидация</h3>
          <p>
            Валидация с обращением к серверу. Используйте onBlur для запуска и setError для установки ошибок.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Загрузка данных</h3>
          <p>
            Загрузите данные в useEffect и используйте reset для заполнения формы.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Submit с loading/error</h3>
          <p>
            Управляйте состояниями submitting и error через useState. Блокируйте форму во время отправки.
          </p>

          <h3 style={{ marginTop: '1rem' }}>Debounce</h3>
          <p>
            Используйте setTimeout с очисткой в useEffect для отложенного выполнения действий.
          </p>
        </div>
      </section>
    </div>
  )
}
