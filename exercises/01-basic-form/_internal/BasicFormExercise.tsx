import { useState } from 'react'
import { useTheme } from '../../../src/hooks/useTheme'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { useExerciseNavigation } from '../../../src/hooks/useExerciseNavigation'
import { TheoryBlock } from '../../../src/components/TheoryBlock'
import { FormContainer } from '../../../src/components/FormContainer'
import { TaskDescription } from '../../../src/components/TaskDescription'
import { Task1_1 } from '../Task1_1'
import { Task1_2 } from '../Task1_2'
import { Task1_3 } from '../Task1_3'
import { Task1_4 } from '../Task1_4'
import { Task1_1_Solution, Task1_2_Solution, Task1_3_Solution, Task1_4_Solution } from './Solution'
import taskStyles from '../../../src/components/TaskButtons.module.css'
import solutionStyles from '../../../src/components/SolutionButton.module.css'

type Task = '1.1' | '1.2' | '1.3' | '1.4'

interface BasicFormExerciseProps {
  initialTask?: string
}

export function BasicFormExercise({ initialTask }: BasicFormExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '1',
    defaultTask: '1.1',
    validTasks: ['1.1', '1.2', '1.3', '1.4']
  })

  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '1.1': <Task1_1 />,
    '1.2': <Task1_2 />,
    '1.3': <Task1_3 />,
    '1.4': <Task1_4 />,
  }

  const solutions = {
    '1.1': <Task1_1_Solution />,
    '1.2': <Task1_2_Solution />,
    '1.3': <Task1_3_Solution />,
    '1.4': <Task1_4_Solution />,
  }

  const taskList: { id: Task; name: string }[] = [
    { id: '1.1', name: 'Форма регистрации' },
    { id: '1.2', name: 'Watch в реальном времени' },
    { id: '1.3', name: 'setValue и getValues' },
    { id: '1.4', name: 'formState' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 1: {t('nav.basics')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.1.desc')}
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

      <TaskDescription taskNumber={currentTask} level="1" />

      <TheoryBlock level="1" />
    </div>
  )
}
