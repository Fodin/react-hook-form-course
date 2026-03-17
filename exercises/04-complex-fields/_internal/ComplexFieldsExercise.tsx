import { useState } from 'react'
import { useTheme } from '../../../src/hooks/useTheme'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { useExerciseNavigation } from '../../../src/hooks/useExerciseNavigation'
import { TheoryBlock } from '../../../src/components/TheoryBlock'
import { FormContainer } from '../../../src/components/FormContainer'
import { TaskDescription } from '../../../src/components/TaskDescription'
import { Task4_1 } from '../Task4_1'
import { Task4_2 } from '../Task4_2'
import { Task4_3 } from '../Task4_3'
import { Task4_4 } from '../Task4_4'
import { Task4_5 } from '../Task4_5'
import { Task4_1_Solution, Task4_2_Solution, Task4_3_Solution, Task4_4_Solution, Task4_5_Solution } from './Solution'
import taskStyles from '../../../src/components/TaskButtons.module.css'
import solutionStyles from '../../../src/components/SolutionButton.module.css'

type Task = '4.1' | '4.2' | '4.3' | '4.4' | '4.5'

interface ComplexFieldsExerciseProps {
  initialTask?: string
}

export function ComplexFieldsExercise({ initialTask }: ComplexFieldsExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '4',
    defaultTask: '4.1',
    validTasks: ['4.1', '4.2', '4.3', '4.4', '4.5']
  })
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '4.1': <Task4_1 />,
    '4.2': <Task4_2 />,
    '4.3': <Task4_3 />,
    '4.4': <Task4_4 />,
    '4.5': <Task4_5 />,
  }

  const solutions = {
    '4.1': <Task4_1_Solution />,
    '4.2': <Task4_2_Solution />,
    '4.3': <Task4_3_Solution />,
    '4.4': <Task4_4_Solution />,
    '4.5': <Task4_5_Solution />,
  }

  const taskList = [
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
          {t('nav.level')} 4: {t('nav.complex')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.4.desc')}
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

      <TaskDescription taskNumber={currentTask} level="4" />

      <TheoryBlock level="4" />
    </div>
  )
}
