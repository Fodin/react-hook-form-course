import { TaskBlock, Requirements, Tip, InterfaceDef, CodeExample } from '../../components/TaskBlock'

// ============================================
// Задание 3.1: Базовая валидация с Zod
// ============================================

// TODO: Импортируйте z из 'zod'
// import { z } from 'zod'

// TODO: Импортируйте zodResolver из '@hookform/resolvers/zod'
// import { zodResolver } from '@hookform/resolvers/zod'

// TODO: Создайте схему
// const schema = z.object({ ... })

// TODO: Выведите тип
// type FormData = z.infer<typeof schema>

export function Task3_1_Template() {
  // TODO: Используйте useForm с zodResolver

  return (
    <TaskBlock taskNumber="3.1" title="Базовая валидация с Zod">
      <Requirements>
        <li><code>email</code>: email формат, обязательное поле</li>
        <li><code>password</code>: минимум 8 символов</li>
        <li><code>confirmPassword</code>: должно совпадать с password</li>
        <li><code>age</code>: число от 18 до 120</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  email: string
  password: string
  confirmPassword: string
  age: number
}`}
      />

      <Tip>
        Подключите zodResolver к useForm:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`const { register, handleSubmit } = useForm<FormData>({
  resolver: zodResolver(schema)
})`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 3.2: Валидация с Yup
// ============================================

// TODO: Импортируйте yup
// import * as yup from 'yup'

// TODO: Импортируйте yupResolver из '@hookform/resolvers/yup'
// import { yupResolver } from '@hookform/resolvers/yup'

export function Task3_2_Template() {
  // TODO: Перепишите схему с Yup

  return (
    <TaskBlock taskNumber="3.2" title="Валидация с Yup">
      <Requirements>
        <li>Перепишите форму из задания 3.1 используя Yup</li>
        <li>Сравните синтаксис Zod и Yup</li>
        <li>Обратите внимание на отличия в API</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  email: string
  password: string
  confirmPassword: string
  age: number
}`}
      />

      <Tip>
        Yup использует цепочки методов:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
})`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 3.3: Сложные схемы
// ============================================

// TODO: Создайте сложную схему с объектами, массивами, enum

export function Task3_3_Template() {
  // TODO: Реализуйте форму анкеты

  return (
    <TaskBlock taskNumber="3.3" title="Сложные схемы">
      <Requirements>
        <li><code>personalInfo</code>: объект с firstName, lastName, age</li>
        <li><code>contacts</code>: массив объектов &#123; type, value &#125;</li>
        <li><code>skills</code>: массив строк (минимум 1 навык)</li>
        <li><code>role</code>: enum (developer, designer, manager)</li>
        <li><code>bio</code>: опционально, максимум 500 символов</li>
      </Requirements>

      <CodeExample
        label="Пример данных:"
        code={`{
  personalInfo: { firstName: "John", lastName: "Doe", age: 30 },
  contacts: [
    { type: "email", value: "john@example.com" },
    { type: "phone", value: "+1234567890" }
  ],
  skills: ["React", "TypeScript"],
  role: "developer",
  bio: "Опытный разработчик..."
}`}
      />

      <Tip>
        Используйте <code>z.object()</code> для вложенных структур и <code>z.array()</code> для массивов.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 3.4: refine и кастомные сообщения
// ============================================

export function Task3_4_Template() {
  // TODO: Используйте .refine() для cross-field валидации

  return (
    <TaskBlock taskNumber="3.4" title="refine и кастомные сообщения">
      <Requirements>
        <li>Пароли должны совпадать</li>
        <li>Новый пароль должен отличаться от текущего</li>
        <li>Используйте <code>.refine()</code> для кросс-полевой валидации</li>
        <li>Добавьте кастомные сообщения об ошибках</li>
      </Requirements>

      <InterfaceDef
        name="ChangePasswordForm"
        code={`interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}`}
      />

      <Tip>
        <code>.refine()</code> позволяет создавать кастомные правила валидации:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`.refine((data) => data.password === data.confirm, {
  message: "Пароли не совпадают",
  path: ["confirm"]
})`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 3.5: Сравнение Zod vs Yup
// ============================================

export function Task3_5_Template() {
  return (
    <TaskBlock taskNumber="3.5" title="Сравнение Zod vs Yup">
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{
          margin: '0 0 0.75rem 0',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#495057',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          📝 Вопросы для анализа:
        </h4>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li>Что понравилось больше в Zod?</li>
          <li>Что понравилось больше в Yup?</li>
          <li>Какую библиотеку выбрали бы для проекта и почему?</li>
          <li>Какие отличия в размерах бандла?</li>
          <li>Какая библиотека имеет лучшую типизацию?</li>
        </ol>
      </div>

      <Tip>
        Обратите внимание на:
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
          <li>Синтаксис и читаемость кода</li>
          <li>Качество сообщений об ошибках</li>
          <li>Поддержку TypeScript</li>
          <li>Размер бандла</li>
          <li>Сообщество и документацию</li>
        </ul>
      </Tip>
    </TaskBlock>
  )
}
