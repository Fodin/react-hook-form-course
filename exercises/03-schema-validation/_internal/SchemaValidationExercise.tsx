import { useState } from 'react'
import { useTheme } from '../../../src/hooks/useTheme'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { useExerciseNavigation } from '../../../src/hooks/useExerciseNavigation'
import { TheoryBlock } from '../../../src/components/TheoryBlock'
import { FormContainer } from '../../../src/components/FormContainer'
import { TaskDescription } from '../../../src/components/TaskDescription'
import { Task3_1 } from '../Task3_1'
import { Task3_2 } from '../Task3_2'
import { Task3_3 } from '../Task3_3'
import { Task3_4 } from '../Task3_4'
import { Task3_5 } from '../Task3_5'
import { Task3_1_Solution, Task3_2_Solution, Task3_3_Solution, Task3_4_Solution, Task3_5_Solution } from './Solution'
import taskStyles from '../../../src/components/TaskButtons.module.css'
import solutionStyles from '../../../src/components/SolutionButton.module.css'

type Task = '3.1' | '3.2' | '3.3' | '3.4' | '3.5'

interface SchemaValidationExerciseProps {
  initialTask?: string
}

export function SchemaValidationExercise({ initialTask }: SchemaValidationExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '3',
    defaultTask: '3.1',
    validTasks: ['3.1', '3.2', '3.3', '3.4', '3.5']
  })
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '3.1': <Task3_1 />,
    '3.2': <Task3_2 />,
    '3.3': <Task3_3 />,
    '3.4': <Task3_4 />,
    '3.5': <Task3_5 />,
  }

  const solutions = {
    '3.1': <Task3_1_Solution />,
    '3.2': <Task3_2_Solution />,
    '3.3': <Task3_3_Solution />,
    '3.4': <Task3_4_Solution />,
    '3.5': <Task3_5_Solution />,
  }

  const taskList = [
    { id: '3.1', name: 'Zod базовая' },
    { id: '3.2', name: 'Yup базовая' },
    { id: '3.3', name: 'Сложные схемы' },
    { id: '3.4', name: 'refine' },
    { id: '3.5', name: 'Сравнение' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 3: {t('nav.schemas')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.3.desc')}
        </p>
      </header>

      <div className={taskStyles.container}>
        {taskList.map((task) => {
          const isActive = currentTask === task.id
          const buttonClass = `${taskStyles.button} ${
            isActive
              ? (isDark ? taskStyles.buttonActiveDark : taskStyles.buttonActiveLight)
              : (isDark ? taskStyles.buttonInactiveDark : taskStyles.buttonInactiveLight)
          }`
          return (
            <button
              key={task.id}
              onClick={() => changeTask(task.id)}
              className={buttonClass}
            >
              {t('task.title')} {task.id}
            </button>
          )
        })}
      </div>

      <div className={solutionStyles.container}>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={`${solutionStyles.button} ${
            showSolution ? solutionStyles.buttonHide : solutionStyles.buttonShow
          }`}
        >
          {showSolution ? t('solution.hide') : t('solution.show')}
        </button>
      </div>

      {showSolution ? solutions[currentTask] : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="3" />

      <TheoryBlock level="3" />
    </div>
  )
}
