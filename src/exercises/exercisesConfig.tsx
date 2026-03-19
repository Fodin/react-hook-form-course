import type { ReactElement } from 'react';

import { useLanguage } from '../hooks';
import type { TranslationKey } from '../translations';
import { Task0_1_Solution, Task0_2_Solution } from './00-setup/Solution';
import {
  Task1_1_Solution,
  Task1_2_Solution,
  Task1_3_Solution,
  Task1_4_Solution
} from './01-basic-form/Solution';
import {
  Task2_1_Solution,
  Task2_2_Solution,
  Task2_3_Solution,
  Task2_4_Solution
} from './02-validation/Solution';
import {
  Task3_1_Solution,
  Task3_2_Solution,
  Task3_3_Solution,
  Task3_4_Solution,
  Task3_5_Solution
} from './03-schema-validation/Solution';
import {
  Task4_1_Solution,
  Task4_2_Solution,
  Task4_3_Solution,
  Task4_4_Solution,
  Task4_5_Solution
} from './04-complex-fields/Solution';
import {
  Task5_1_Solution,
  Task5_2_Solution,
  Task5_3_Solution,
  Task5_4_Solution
} from './05-dynamic-forms/Solution';
import {
  Task6_1_Solution,
  Task6_2_Solution,
  Task6_3_Solution,
  Task6_4_Solution,
  Task6_5_Solution
} from './06-states-ux/Solution';
import {
  Task7_1_Solution,
  Task7_2_Solution,
  Task7_3_Solution,
  Task7_4_Solution
} from './07-async/Solution';
import {
  Task8_1_Solution,
  Task8_2_Solution,
  Task8_3_Solution,
  Task8_4_Solution,
  Task8_5_Solution
} from './08-advanced/Solution';

function TaskStub({ id }: { id: string }) {
  const { t } = useLanguage();
  return (
    <div className="exercise-container">
      <h2>{t('task.title')} {id}</h2>
      <p>{t('task.placeholder')}</p>
    </div>
  );
}

export interface TaskEntry {
  id: string;
  nameKey: TranslationKey;
  component: ReactElement;
  solution: ReactElement;
}

export interface LevelConfig {
  levelId: string;
  navKey: TranslationKey;
  descKey: TranslationKey;
  tasks: TaskEntry[];
}

function task(id: string, nameKey: TranslationKey, solution: ReactElement): TaskEntry {
  return { id, nameKey, component: <TaskStub id={id}/>, solution };
}

export const exercisesConfig: LevelConfig[] = [
  {
    levelId: '0',
    navKey: 'nav.setup',
    descKey: 'level.0.desc',
    tasks: [
      task('0.1', 'task.0.1', <Task0_1_Solution/>),
      task('0.2', 'task.0.2', <Task0_2_Solution/>),
    ],
  },
  {
    levelId: '1',
    navKey: 'nav.basics',
    descKey: 'level.1.desc',
    tasks: [
      task('1.1', 'task.1.1', <Task1_1_Solution/>),
      task('1.2', 'task.1.2', <Task1_2_Solution/>),
      task('1.3', 'task.1.3', <Task1_3_Solution/>),
      task('1.4', 'task.1.4', <Task1_4_Solution/>),
    ],
  },
  {
    levelId: '2',
    navKey: 'nav.validation',
    descKey: 'level.2.desc',
    tasks: [
      task('2.1', 'task.2.1', <Task2_1_Solution/>),
      task('2.2', 'task.2.2', <Task2_2_Solution/>),
      task('2.3', 'task.2.3', <Task2_3_Solution/>),
      task('2.4', 'task.2.4', <Task2_4_Solution/>),
    ],
  },
  {
    levelId: '3',
    navKey: 'nav.schemas',
    descKey: 'level.3.desc',
    tasks: [
      task('3.1', 'task.3.1', <Task3_1_Solution/>),
      task('3.2', 'task.3.2', <Task3_2_Solution/>),
      task('3.3', 'task.3.3', <Task3_3_Solution/>),
      task('3.4', 'task.3.4', <Task3_4_Solution/>),
      task('3.5', 'task.3.5', <Task3_5_Solution/>),
    ],
  },
  {
    levelId: '4',
    navKey: 'nav.complex',
    descKey: 'level.4.desc',
    tasks: [
      task('4.1', 'task.4.1', <Task4_1_Solution/>),
      task('4.2', 'task.4.2', <Task4_2_Solution/>),
      task('4.3', 'task.4.3', <Task4_3_Solution/>),
      task('4.4', 'task.4.4', <Task4_4_Solution/>),
      task('4.5', 'task.4.5', <Task4_5_Solution/>),
    ],
  },
  {
    levelId: '5',
    navKey: 'nav.dynamic',
    descKey: 'level.5.desc',
    tasks: [
      task('5.1', 'task.5.1', <Task5_1_Solution/>),
      task('5.2', 'task.5.2', <Task5_2_Solution/>),
      task('5.3', 'task.5.3', <Task5_3_Solution/>),
      task('5.4', 'task.5.4', <Task5_4_Solution/>),
    ],
  },
  {
    levelId: '6',
    navKey: 'nav.ux',
    descKey: 'level.6.desc',
    tasks: [
      task('6.1', 'task.6.1', <Task6_1_Solution/>),
      task('6.2', 'task.6.2', <Task6_2_Solution/>),
      task('6.3', 'task.6.3', <Task6_3_Solution/>),
      task('6.4', 'task.6.4', <Task6_4_Solution/>),
      task('6.5', 'task.6.5', <Task6_5_Solution/>),
    ],
  },
  {
    levelId: '7',
    navKey: 'nav.async',
    descKey: 'level.7.desc',
    tasks: [
      task('7.1', 'task.7.1', <Task7_1_Solution/>),
      task('7.2', 'task.7.2', <Task7_2_Solution/>),
      task('7.3', 'task.7.3', <Task7_3_Solution/>),
      task('7.4', 'task.7.4', <Task7_4_Solution/>),
    ],
  },
  {
    levelId: '8',
    navKey: 'nav.advanced',
    descKey: 'level.8.desc',
    tasks: [
      task('8.1', 'task.8.1', <Task8_1_Solution/>),
      task('8.2', 'task.8.2', <Task8_2_Solution/>),
      task('8.3', 'task.8.3', <Task8_3_Solution/>),
      task('8.4', 'task.8.4', <Task8_4_Solution/>),
      task('8.5', 'task.8.5', <Task8_5_Solution/>),
    ],
  },
];

export const exercisesConfigMap = new Map(
  exercisesConfig.map(level => [level.levelId, level])
);
