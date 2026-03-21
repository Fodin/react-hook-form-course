import type { ReactElement } from 'react'

import * as Level0 from 'src/exercises/00-setup'
import * as Level1 from 'src/exercises/01-basic-form'
import * as Level2 from 'src/exercises/02-validation'
import * as Level3 from 'src/exercises/03-schema-validation'
import * as Level4 from 'src/exercises/04-complex-fields'
import * as Level5 from 'src/exercises/05-dynamic-forms'
import * as Level6 from 'src/exercises/06-states-ux'
import * as Level7 from 'src/exercises/07-async'
import * as Level8 from 'src/exercises/08-advanced'

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
    tasks: [task('0.1', <Level0.Task0_1_Solution />), task('0.2', <Level0.Task0_2_Solution />)],
  },
  {
    levelId: '1',
    folder: '01-basic-form',
    navKey: 'nav.basics',
    descKey: 'level.1.desc',
    tasks: [
      task('1.1', <Level1.Task1_1_Solution />),
      task('1.2', <Level1.Task1_2_Solution />),
      task('1.3', <Level1.Task1_3_Solution />),
      task('1.4', <Level1.Task1_4_Solution />),
    ],
  },
  {
    levelId: '2',
    folder: '02-validation',
    navKey: 'nav.validation',
    descKey: 'level.2.desc',
    tasks: [
      task('2.1', <Level2.Task2_1_Solution />),
      task('2.2', <Level2.Task2_2_Solution />),
      task('2.3', <Level2.Task2_3_Solution />),
      task('2.4', <Level2.Task2_4_Solution />),
    ],
  },
  {
    levelId: '3',
    folder: '03-schema-validation',
    navKey: 'nav.schemas',
    descKey: 'level.3.desc',
    tasks: [
      task('3.1', <Level3.Task3_1_Solution />),
      task('3.2', <Level3.Task3_2_Solution />),
      task('3.3', <Level3.Task3_3_Solution />),
      task('3.4', <Level3.Task3_4_Solution />),
      task('3.5', <Level3.Task3_5_Solution />),
      task('3.6', <Level3.Task3_6_Solution />),
    ],
  },
  {
    levelId: '4',
    folder: '04-complex-fields',
    navKey: 'nav.complex',
    descKey: 'level.4.desc',
    tasks: [
      task('4.1', <Level4.Task4_1_Solution />),
      task('4.2', <Level4.Task4_2_Solution />),
      task('4.3', <Level4.Task4_3_Solution />),
      task('4.4', <Level4.Task4_4_Solution />),
      task('4.5', <Level4.Task4_5_Solution />),
    ],
  },
  {
    levelId: '5',
    folder: '05-dynamic-forms',
    navKey: 'nav.dynamic',
    descKey: 'level.5.desc',
    tasks: [
      task('5.1', <Level5.Task5_1_Solution />),
      task('5.2', <Level5.Task5_2_Solution />),
      task('5.3', <Level5.Task5_3_Solution />),
      task('5.4', <Level5.Task5_4_Solution />),
    ],
  },
  {
    levelId: '6',
    folder: '06-states-ux',
    navKey: 'nav.ux',
    descKey: 'level.6.desc',
    tasks: [
      task('6.1', <Level6.Task6_1_Solution />),
      task('6.2', <Level6.Task6_2_Solution />),
      task('6.3', <Level6.Task6_3_Solution />),
      task('6.4', <Level6.Task6_4_Solution />),
      task('6.5', <Level6.Task6_5_Solution />),
      task('6.6', <Level6.Task6_6_Solution />),
    ],
  },
  {
    levelId: '7',
    folder: '07-async',
    navKey: 'nav.async',
    descKey: 'level.7.desc',
    tasks: [
      task('7.1', <Level7.Task7_1_Solution />),
      task('7.2', <Level7.Task7_2_Solution />),
      task('7.3', <Level7.Task7_3_Solution />),
      task('7.4', <Level7.Task7_4_Solution />),
      task('7.5', <Level7.Task7_5_Solution />),
    ],
  },
  {
    levelId: '8',
    folder: '08-advanced',
    navKey: 'nav.advanced',
    descKey: 'level.8.desc',
    tasks: [
      task('8.1', <Level8.Task8_1_Solution />),
      task('8.2', <Level8.Task8_2_Solution />),
      task('8.3', <Level8.Task8_3_Solution />),
      task('8.4', <Level8.Task8_4_Solution />),
      task('8.5', <Level8.Task8_5_Solution />),
      task('8.6', <Level8.Task8_6_Solution />),
    ],
  },
]

export const exercisesConfigMap = new Map(exercisesConfig.map(level => [level.levelId, level]))
