import type { ReactElement } from 'react'

import {
  Task0_1, Task0_2,
  Task1_1, Task1_2, Task1_3, Task1_4,
  Task2_1, Task2_2, Task2_3, Task2_4,
  Task3_1, Task3_2, Task3_3, Task3_4, Task3_5,
  Task4_1, Task4_2, Task4_3, Task4_4, Task4_5,
  Task5_1, Task5_2, Task5_3, Task5_4,
  Task6_1, Task6_2, Task6_3, Task6_4, Task6_5,
  Task7_1, Task7_2, Task7_3, Task7_4,
  Task8_1, Task8_2, Task8_3, Task8_4, Task8_5,
} from '.'

import { Task0_1_Solution, Task0_2_Solution } from './00-setup/Solution'
import { Task1_1_Solution, Task1_2_Solution, Task1_3_Solution, Task1_4_Solution } from './01-basic-form/Solution'
import { Task2_1_Solution, Task2_2_Solution, Task2_3_Solution, Task2_4_Solution } from './02-validation/Solution'
import { Task3_1_Solution, Task3_2_Solution, Task3_3_Solution, Task3_4_Solution, Task3_5_Solution } from './03-schema-validation/Solution'
import { Task4_1_Solution, Task4_2_Solution, Task4_3_Solution, Task4_4_Solution, Task4_5_Solution } from './04-complex-fields/Solution'
import { Task5_1_Solution, Task5_2_Solution, Task5_3_Solution, Task5_4_Solution } from './05-dynamic-forms/Solution'
import { Task6_1_Solution, Task6_2_Solution, Task6_3_Solution, Task6_4_Solution, Task6_5_Solution } from './06-states-ux/Solution'
import { Task7_1_Solution, Task7_2_Solution, Task7_3_Solution, Task7_4_Solution } from './07-async/Solution'
import { Task8_1_Solution, Task8_2_Solution, Task8_3_Solution, Task8_4_Solution, Task8_5_Solution } from './08-advanced/Solution'

import type { TranslationKey } from '../translations'

export interface TaskEntry {
  id: string
  nameKey: TranslationKey
  component: ReactElement
  solution: ReactElement
}

export interface LevelConfig {
  levelId: string
  navKey: TranslationKey
  descKey: TranslationKey
  tasks: TaskEntry[]
}

export const exercisesConfig: LevelConfig[] = [
  {
    levelId: '0',
    navKey: 'nav.setup',
    descKey: 'level.0.desc',
    tasks: [
      { id: '0.1', nameKey: 'task.0.1', component: <Task0_1 />, solution: <Task0_1_Solution /> },
      { id: '0.2', nameKey: 'task.0.2', component: <Task0_2 />, solution: <Task0_2_Solution /> },
    ],
  },
  {
    levelId: '1',
    navKey: 'nav.basics',
    descKey: 'level.1.desc',
    tasks: [
      { id: '1.1', nameKey: 'task.1.1', component: <Task1_1 />, solution: <Task1_1_Solution /> },
      { id: '1.2', nameKey: 'task.1.2', component: <Task1_2 />, solution: <Task1_2_Solution /> },
      { id: '1.3', nameKey: 'task.1.3', component: <Task1_3 />, solution: <Task1_3_Solution /> },
      { id: '1.4', nameKey: 'task.1.4', component: <Task1_4 />, solution: <Task1_4_Solution /> },
    ],
  },
  {
    levelId: '2',
    navKey: 'nav.validation',
    descKey: 'level.2.desc',
    tasks: [
      { id: '2.1', nameKey: 'task.2.1', component: <Task2_1 />, solution: <Task2_1_Solution /> },
      { id: '2.2', nameKey: 'task.2.2', component: <Task2_2 />, solution: <Task2_2_Solution /> },
      { id: '2.3', nameKey: 'task.2.3', component: <Task2_3 />, solution: <Task2_3_Solution /> },
      { id: '2.4', nameKey: 'task.2.4', component: <Task2_4 />, solution: <Task2_4_Solution /> },
    ],
  },
  {
    levelId: '3',
    navKey: 'nav.schemas',
    descKey: 'level.3.desc',
    tasks: [
      { id: '3.1', nameKey: 'task.3.1', component: <Task3_1 />, solution: <Task3_1_Solution /> },
      { id: '3.2', nameKey: 'task.3.2', component: <Task3_2 />, solution: <Task3_2_Solution /> },
      { id: '3.3', nameKey: 'task.3.3', component: <Task3_3 />, solution: <Task3_3_Solution /> },
      { id: '3.4', nameKey: 'task.3.4', component: <Task3_4 />, solution: <Task3_4_Solution /> },
      { id: '3.5', nameKey: 'task.3.5', component: <Task3_5 />, solution: <Task3_5_Solution /> },
    ],
  },
  {
    levelId: '4',
    navKey: 'nav.complex',
    descKey: 'level.4.desc',
    tasks: [
      { id: '4.1', nameKey: 'task.4.1', component: <Task4_1 />, solution: <Task4_1_Solution /> },
      { id: '4.2', nameKey: 'task.4.2', component: <Task4_2 />, solution: <Task4_2_Solution /> },
      { id: '4.3', nameKey: 'task.4.3', component: <Task4_3 />, solution: <Task4_3_Solution /> },
      { id: '4.4', nameKey: 'task.4.4', component: <Task4_4 />, solution: <Task4_4_Solution /> },
      { id: '4.5', nameKey: 'task.4.5', component: <Task4_5 />, solution: <Task4_5_Solution /> },
    ],
  },
  {
    levelId: '5',
    navKey: 'nav.dynamic',
    descKey: 'level.5.desc',
    tasks: [
      { id: '5.1', nameKey: 'task.5.1', component: <Task5_1 />, solution: <Task5_1_Solution /> },
      { id: '5.2', nameKey: 'task.5.2', component: <Task5_2 />, solution: <Task5_2_Solution /> },
      { id: '5.3', nameKey: 'task.5.3', component: <Task5_3 />, solution: <Task5_3_Solution /> },
      { id: '5.4', nameKey: 'task.5.4', component: <Task5_4 />, solution: <Task5_4_Solution /> },
    ],
  },
  {
    levelId: '6',
    navKey: 'nav.ux',
    descKey: 'level.6.desc',
    tasks: [
      { id: '6.1', nameKey: 'task.6.1', component: <Task6_1 />, solution: <Task6_1_Solution /> },
      { id: '6.2', nameKey: 'task.6.2', component: <Task6_2 />, solution: <Task6_2_Solution /> },
      { id: '6.3', nameKey: 'task.6.3', component: <Task6_3 />, solution: <Task6_3_Solution /> },
      { id: '6.4', nameKey: 'task.6.4', component: <Task6_4 />, solution: <Task6_4_Solution /> },
      { id: '6.5', nameKey: 'task.6.5', component: <Task6_5 />, solution: <Task6_5_Solution /> },
    ],
  },
  {
    levelId: '7',
    navKey: 'nav.async',
    descKey: 'level.7.desc',
    tasks: [
      { id: '7.1', nameKey: 'task.7.1', component: <Task7_1 />, solution: <Task7_1_Solution /> },
      { id: '7.2', nameKey: 'task.7.2', component: <Task7_2 />, solution: <Task7_2_Solution /> },
      { id: '7.3', nameKey: 'task.7.3', component: <Task7_3 />, solution: <Task7_3_Solution /> },
      { id: '7.4', nameKey: 'task.7.4', component: <Task7_4 />, solution: <Task7_4_Solution /> },
    ],
  },
  {
    levelId: '8',
    navKey: 'nav.advanced',
    descKey: 'level.8.desc',
    tasks: [
      { id: '8.1', nameKey: 'task.8.1', component: <Task8_1 />, solution: <Task8_1_Solution /> },
      { id: '8.2', nameKey: 'task.8.2', component: <Task8_2 />, solution: <Task8_2_Solution /> },
      { id: '8.3', nameKey: 'task.8.3', component: <Task8_3 />, solution: <Task8_3_Solution /> },
      { id: '8.4', nameKey: 'task.8.4', component: <Task8_4 />, solution: <Task8_4_Solution /> },
      { id: '8.5', nameKey: 'task.8.5', component: <Task8_5 />, solution: <Task8_5_Solution /> },
    ],
  },
]

export const exercisesConfigMap = new Map(
  exercisesConfig.map(level => [level.levelId, level])
)
