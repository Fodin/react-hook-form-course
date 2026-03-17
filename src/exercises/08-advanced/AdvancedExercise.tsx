import { useState } from 'react';

import { FormContainer, TaskDescription, TheoryBlock } from 'src/components';
import { useTheme, useLanguage, useExerciseNavigation } from 'src/hooks';

import { Task8_1, Task8_2, Task8_3, Task8_4, Task8_5 } from 'exercises';

import {
  Task8_1_Solution,
  Task8_2_Solution,
  Task8_3_Solution,
  Task8_4_Solution,
  Task8_5_Solution,
} from './Solution';
import solutionStyles from '../../components/SolutionButton.module.css';
import taskStyles from '../../components/TaskButtons.module.css';

interface AdvancedExerciseProps {
  initialTask?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdvancedExercise(_props: AdvancedExerciseProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '8',
    defaultTask: '8.1',
    validTasks: ['8.1', '8.2', '8.3', '8.4', '8.5'],
  });
  const [showSolution, setShowSolution] = useState(false);

  const tasks: Record<string, React.ReactElement> = {
    '8.1': <Task8_1/>,
    '8.2': <Task8_2/>,
    '8.3': <Task8_3/>,
    '8.4': <Task8_4/>,
    '8.5': <Task8_5/>,
  };

  const solutions: Record<string, React.ReactElement> = {
    '8.1': <Task8_1_Solution/>,
    '8.2': <Task8_2_Solution/>,
    '8.3': <Task8_3_Solution/>,
    '8.4': <Task8_4_Solution/>,
    '8.5': <Task8_5_Solution/>,
  };

  const taskList = [
    { id: '8.1', name: 'UI-библиотека' },
    { id: '8.2', name: 'Кастомный хук' },
    { id: '8.3', name: 'FormContext' },
    { id: '8.4', name: 'localStorage' },
    { id: '8.5', name: 'Финальный' },
  ];

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 8: {t('nav.advanced')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>{t('level.8.desc')}</p>
      </header>

      <div className={taskStyles.container}>
        {taskList.map(task => {
          const isActive = currentTask === task.id;
          const buttonClass = `${taskStyles.button} ${
            isActive
              ? isDark
                ? taskStyles.buttonActiveDark
                : taskStyles.buttonActiveLight
              : isDark
                ? taskStyles.buttonInactiveDark
                : taskStyles.buttonInactiveLight
          }`;
          return (
            <button key={task.id} onClick={() => changeTask(task.id)} className={buttonClass}>
              {t('task.title')} {task.id}
            </button>
          );
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
        solutions[currentTask]
      ) : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="8"/>

      <TheoryBlock level="8"/>
    </div>
  );
}
