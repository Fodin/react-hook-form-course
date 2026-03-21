import type { ReactElement } from 'react'

import { Task0_1_Solution, Task0_2_Solution } from 'src/exercises/00-setup'
import {
  Task1_1_Solution,
  Task1_2_Solution,
  Task1_3_Solution,
  Task1_4_Solution,
} from 'src/exercises/01-basic-form'
import {
  Task2_1_Solution,
  Task2_2_Solution,
  Task2_3_Solution,
  Task2_4_Solution,
} from 'src/exercises/02-validation'
import {
  Task3_1_Solution,
  Task3_2_Solution,
  Task3_3_Solution,
  Task3_4_Solution,
  Task3_5_Solution,
  Task3_6_Solution,
} from 'src/exercises/03-schema-validation'
import {
  Task4_1_Solution,
  Task4_2_Solution,
  Task4_3_Solution,
  Task4_4_Solution,
  Task4_5_Solution,
} from 'src/exercises/04-complex-fields'
import {
  Task5_1_Solution,
  Task5_2_Solution,
  Task5_3_Solution,
  Task5_4_Solution,
} from 'src/exercises/05-dynamic-forms'
import {
  Task6_1_Solution,
  Task6_2_Solution,
  Task6_3_Solution,
  Task6_4_Solution,
  Task6_5_Solution,
  Task6_6_Solution,
} from 'src/exercises/06-states-ux'
import {
  Task7_1_Solution,
  Task7_2_Solution,
  Task7_3_Solution,
  Task7_4_Solution,
  Task7_5_Solution,
} from 'src/exercises/07-async'
import {
  Task8_1_Solution,
  Task8_2_Solution,
  Task8_3_Solution,
  Task8_4_Solution,
  Task8_5_Solution,
  Task8_6_Solution,
} from 'src/exercises/08-advanced'

import type { TranslationKey } from '../translations'
import { TaskStub } from './TaskStub'

export interface TaskEntry {
  id: string
  component: ReactElement
  solution: ReactElement
}

export interface LevelConfig {
  levelId: string
  folder: string
  navKey: TranslationKey
  descKey: TranslationKey
  tasks: TaskEntry[]
}

function task(id: string, solution: ReactElement): TaskEntry {
  return { id, component: <TaskStub id={id} />, solution }
}

export const exercisesConfig: LevelConfig[] = [
  {
    levelId: '0',
    folder: '00-setup',
    navKey: 'nav.setup',
    descKey: 'level.0.desc',
    tasks: [
      task('0.1', <Task0_1_Solution />),
      task('0.2', <Task0_2_Solution />),
    ],
  },
  {
    levelId: '1',
    folder: '01-basic-form',
    navKey: 'nav.basics',
    descKey: 'level.1.desc',
    tasks: [
      task('1.1', <Task1_1_Solution />),
      task('1.2', <Task1_2_Solution />),
      task('1.3', <Task1_3_Solution />),
      task('1.4', <Task1_4_Solution />),
    ],
  },
  {
    levelId: '2',
    folder: '02-validation',
    navKey: 'nav.validation',
    descKey: 'level.2.desc',
    tasks: [
      task('2.1', <Task2_1_Solution />),
      task('2.2', <Task2_2_Solution />),
      task('2.3', <Task2_3_Solution />),
      task('2.4', <Task2_4_Solution />),
    ],
  },
  {
    levelId: '3',
    folder: '03-schema-validation',
    navKey: 'nav.schemas',
    descKey: 'level.3.desc',
    tasks: [
      task('3.1', <Task3_1_Solution />),
      task('3.2', <Task3_2_Solution />),
      task('3.3', <Task3_3_Solution />),
      task('3.4', <Task3_4_Solution />),
      task('3.5', <Task3_5_Solution />),
      task('3.6', <Task3_6_Solution />),
    ],
  },
  {
    levelId: '4',
    folder: '04-complex-fields',
    navKey: 'nav.complex',
    descKey: 'level.4.desc',
    tasks: [
      task('4.1', <Task4_1_Solution />),
      task('4.2', <Task4_2_Solution />),
      task('4.3', <Task4_3_Solution />),
      task('4.4', <Task4_4_Solution />),
      task('4.5', <Task4_5_Solution />),
    ],
  },
  {
    levelId: '5',
    folder: '05-dynamic-forms',
    navKey: 'nav.dynamic',
    descKey: 'level.5.desc',
    tasks: [
      task('5.1', <Task5_1_Solution />),
      task('5.2', <Task5_2_Solution />),
      task('5.3', <Task5_3_Solution />),
      task('5.4', <Task5_4_Solution />),
    ],
  },
  {
    levelId: '6',
    folder: '06-states-ux',
    navKey: 'nav.ux',
    descKey: 'level.6.desc',
    tasks: [
      task('6.1', <Task6_1_Solution />),
      task('6.2', <Task6_2_Solution />),
      task('6.3', <Task6_3_Solution />),
      task('6.4', <Task6_4_Solution />),
      task('6.5', <Task6_5_Solution />),
      task('6.6', <Task6_6_Solution />),
    ],
  },
  {
    levelId: '7',
    folder: '07-async',
    navKey: 'nav.async',
    descKey: 'level.7.desc',
    tasks: [
      task('7.1', <Task7_1_Solution />),
      task('7.2', <Task7_2_Solution />),
      task('7.3', <Task7_3_Solution />),
      task('7.4', <Task7_4_Solution />),
      task('7.5', <Task7_5_Solution />),
    ],
  },
  {
    levelId: '8',
    folder: '08-advanced',
    navKey: 'nav.advanced',
    descKey: 'level.8.desc',
    tasks: [
      task('8.1', <Task8_1_Solution />),
      task('8.2', <Task8_2_Solution />),
      task('8.3', <Task8_3_Solution />),
      task('8.4', <Task8_4_Solution />),
      task('8.5', <Task8_5_Solution />),
      task('8.6', <Task8_6_Solution />),
    ],
  },
]

export const exercisesConfigMap = new Map(exercisesConfig.map(level => [level.levelId, level]))
