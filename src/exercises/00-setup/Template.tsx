import { useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 0.1: Первая форма
// ============================================

// TODO: Определите интерфейс для данных формы
// interface LoginForm { ... }

export function Template() {
  // TODO: Инициализируйте useForm с типом LoginForm
  // const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Создайте функцию onSubmit для обработки данных
  // const onSubmit = (data: LoginForm) => { ... }

  return (
    <TaskBlock taskNumber="0.1" title="Первая форма">
      <Requirements>
        <li>Инициализируйте хук <code>useForm</code> с типом <code>LoginForm</code></li>
        <li>Зарегистрируйте поле <code>email</code> через <code>register</code></li>
        <li>Зарегистрируйте поле <code>password</code> через <code>register</code></li>
        <li>Создайте функцию <code>onSubmit</code> для обработки данных</li>
        <li>Прикрепите <code>handleSubmit(onSubmit)</code> к форме</li>
      </Requirements>

      <InterfaceDef
        name="LoginForm"
        code={`interface LoginForm {
  email: string
  password: string
}`}
      />

      <Tip>
        <code>register</code> возвращает <code>onChange</code>, <code>onBlur</code>, <code>name</code>, <code>ref</code> для подключения к input.
      </Tip>
    </TaskBlock>
  )
}
