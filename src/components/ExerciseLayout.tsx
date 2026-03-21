import { useState } from 'react'

import type { LevelConfig } from '../exercises/exercisesConfig'
import { useLanguage, useProgress, useExerciseNavigation } from '../hooks'
import { FormContainer } from './FormContainer'
import { TaskDescription } from './TaskDescription'
import { TheoryBlock } from './TheoryBlock'

import solutionStyles from './SolutionButton.module.css'
import taskStyles from './TaskButtons.module.css'

interface ExerciseLayoutProps {
  config: LevelConfig
}

export function ExerciseLayout({ config }: ExerciseLayoutProps) {
  const { t } = useLanguage()
  const { isTaskComplete, toggleTask } = useProgress()

  const { levelId, navKey, descKey, tasks } = config
  const taskIds = tasks.map(task => task.id)
  const defaultTask = taskIds[0]

  const { currentTask, changeTask } = useExerciseNavigation({
    defaultTask,
    validTasks: taskIds,
  })

  const [showSolution, setShowSolution] = useState(false)

  const currentTaskEntry = tasks.find(task => task.id === currentTask)

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} {levelId}: {t(navKey)}
        </h1>
        <p style={{ color: 'var(--clr-text-muted)' }}>{t(descKey)}</p>
      </header>

      <div className={taskStyles.container}>
        {tasks.map(task => {
          const completed = isTaskComplete(levelId, task.id)
          const isActive = currentTask === task.id
          const buttonClass = `${taskStyles.button} ${
            isActive ? taskStyles.buttonActive : taskStyles.buttonInactive
          } ${completed ? taskStyles.buttonCompleted : ''}`

          return (
            <div key={task.id} className={taskStyles.taskWrapper}>
              <button onClick={() => changeTask(task.id)} className={buttonClass}>
                {t('task.title')} {task.id}
              </button>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTask(levelId, task.id)}
                className={taskStyles.checkbox}
                title={completed ? t('task.markIncomplete') : t('task.markComplete')}
              />
            </div>
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

      {showSolution ? (
        currentTaskEntry?.solution
      ) : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {currentTaskEntry?.component}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level={levelId} />

      <TheoryBlock level={levelId} />
    </div>
  )
}
