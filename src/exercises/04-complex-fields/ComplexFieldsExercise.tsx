import { useState } from 'react'
import { Task4_1_Template, Task4_2_Template, Task4_3_Template, Task4_4_Template, Task4_5_Template } from './Template'
import { Task4_1_Solution, Task4_2_Solution, Task4_3_Solution, Task4_4_Solution, Task4_5_Solution } from './Solution'

type Task = '4.1' | '4.2' | '4.3' | '4.4' | '4.5'

export function ComplexFieldsExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('4.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates: Record<Task, React.ReactNode> = {
    '4.1': <Task4_1_Template />,
    '4.2': <Task4_2_Template />,
    '4.3': <Task4_3_Template />,
    '4.4': <Task4_4_Template />,
    '4.5': <Task4_5_Template />,
  }

  const solutions: Record<Task, React.ReactNode> = {
    '4.1': <Task4_1_Solution />,
    '4.2': <Task4_2_Solution />,
    '4.3': <Task4_3_Solution />,
    '4.4': <Task4_4_Solution />,
    '4.5': <Task4_5_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '4.1', name: 'Controller' },
    { id: '4.2', name: 'Radio/Select' },
    { id: '4.3', name: 'Checkbox' },
    { id: '4.4', name: 'File Upload' },
    { id: '4.5', name: 'Дата/Время' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 4: Сложные поля
        </h1>
        <p style={{ color: '#6c757d' }}>
          Controller, radio, select, checkbox, file upload, date/time
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
            background: showSolution ? '#4caf50' : '#646cff',
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
        borderRadius: '8px' 
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📚 Теория</h2>
        <div style={{ lineHeight: 1.8 }}>
          <h3>Controller</h3>
          <p>
            Компонент для интеграции контролируемых компонентов (UI-библиотеки) с react-hook-form.
          </p>
          
          <h3 style={{ marginTop: '1rem' }}>Radio/Select</h3>
          <p>
            Используйте register как с обычными input. Для select значение берётся из выбранного option.
          </p>
          
          <h3 style={{ marginTop: '1rem' }}>Checkbox</h3>
          <p>
            Одиночный — boolean значение. Множественный — используйте setValue для управления массивом.
          </p>
          
          <h3 style={{ marginTop: '1rem' }}>File Upload</h3>
          <p>
            Валидируйте FileList через refine: размер, тип файла. Используйте URL.createObjectURL для предпросмотра.
          </p>
        </div>
      </section>
    </div>
  )
}
