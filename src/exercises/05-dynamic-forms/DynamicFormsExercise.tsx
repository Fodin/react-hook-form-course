import { useState } from 'react';

import { FormContainer, TaskDescription, TheoryBlock } from 'src/components';
import { useTheme, useLanguage, useExerciseNavigation } from 'src/hooks';

import { Task5_1, Task5_2, Task5_3, Task5_4 } from 'exercises';

import { Task5_1_Solution, Task5_2_Solution, Task5_3_Solution, Task5_4_Solution } from './Solution';
import solutionStyles from '../../components/SolutionButton.module.css';
import taskStyles from '../../components/TaskButtons.module.css';

interface DynamicFormsExerciseProps {
  initialTask?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DynamicFormsExercise(_props: DynamicFormsExerciseProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '5',
    defaultTask: '5.1',
    validTasks: ['5.1', '5.2', '5.3', '5.4'],
  });
  const [showSolution, setShowSolution] = useState(false);

  const tasks: Record<string, React.ReactElement> = {
    '5.1': <Task5_1/>,
    '5.2': <Task5_2/>,
    '5.3': <Task5_3/>,
    '5.4': <Task5_4/>,
  };

  const solutions: Record<string, React.ReactElement> = {
    '5.1': <Task5_1_Solution/>,
    '5.2': <Task5_2_Solution/>,
    '5.3': <Task5_3_Solution/>,
    '5.4': <Task5_4_Solution/>,
  };

  const taskList = [
    { id: '5.1', name: 'useFieldArray' },
    { id: '5.2', name: 'Условные поля' },
    { id: '5.3', name: 'Зависимые поля' },
    { id: '5.4', name: 'Wizard' },
  ];

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 5: {t('nav.dynamic')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>{t('level.5.desc')}</p>
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

      <TaskDescription taskNumber={currentTask} level="5"/>

      <TheoryBlock level="5"/>
    </div>
  );
}
