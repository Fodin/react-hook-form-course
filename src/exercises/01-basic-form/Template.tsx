import { useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 1.1: Форма регистрации
// ============================================

// TODO: Определите интерфейс RegistrationForm
// interface RegistrationForm { ... }

export function Task1_1_Template() {
  // TODO: Инициализируйте useForm<RegistrationForm>
  const {} = useForm()

  // TODO: Создайте onSubmit функцию
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="1.1" title="Форма регистрации">
      <Requirements>
        <li>Создайте форму с полями: <code>firstName</code>, <code>lastName</code>, <code>email</code>, <code>age</code>, <code>bio</code>, <code>website</code></li>
        <li><code>firstName</code> и <code>lastName</code> — текст, обязательные поля</li>
        <li><code>email</code> — email, обязательное поле</li>
        <li><code>age</code> — число, обязательное, от 18 до 100</li>
        <li><code>bio</code> — textarea, необязательное</li>
        <li><code>website</code> — URL, необязательное</li>
        <li>При отправке выводите данные в консоль и отображайте на странице</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  age: number
  bio?: string
  website?: string
}`}
      />

      <Tip>
        Используйте <code>valueAsNumber</code> для поля <code>age</code>, чтобы получить числовое значение.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте <form onSubmit={handleSubmit(onSubmit)}>
          2. Добавьте поля: firstName, lastName, email, age, bio, website
          3. Для age используйте valueAsNumber
          4. Добавьте кнопку type="submit"
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 1.2: Watch для отслеживания
// ============================================

export function Task1_2_Template() {
  // TODO: Используйте watch для отслеживания username и password

  return (
    <TaskBlock taskNumber="1.2" title="Watch в реальном времени">
      <Requirements>
        <li>Создайте форму с полями <code>username</code> и <code>password</code></li>
        <li>В реальном времени отображайте длину username</li>
        <li>Показывайте "силу" пароля: <strong>Слабый</strong> (&lt;6), <strong>Средний</strong> (6-10), <strong>Сильный</strong> (&gt;10)</li>
        <li>Используйте <code>watch</code> для отслеживания изменений</li>
      </Requirements>

      <InterfaceDef
        name="LoginForm"
        code={`interface LoginForm {
  username: string
  password: string
}`}
      />

      <Tip>
        <code>watch</code> возвращает текущие значения полей и подписывается на изменения.
        <br />
        Пример UI:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`Username: [john_doe]
Длина: 8 символов

Password: [******]
Сила пароля: Сильный ✓`}
        </pre>
      </Tip>

      {/* ============================================================
          TODO: Создайте форму и UI отображения внутри TaskBlock
          
          1. Используйте watch() для получения username и password
          2. Создайте форму с полями username и password
          3. После формы добавьте блок с отображением длины username
          4. Добавьте блок с оценкой силы пароля
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 1.3: setValue и getValues
// ============================================

export function Task1_3_Template() {
  // TODO: Используйте setValue для программного изменения значений

  return (
    <TaskBlock taskNumber="1.3" title="setValue и getValues">
      <Requirements>
        <li>Создайте форму с полями: <code>title</code>, <code>description</code>, <code>price</code></li>
        <li>Кнопка <strong>"Заполнить тестовыми данными"</strong> — заполняет форму preset-значениями</li>
        <li>Кнопка <strong>"Удвоить цену"</strong> — читает <code>price</code> через <code>getValues</code>, умножает на 2, устанавливает через <code>setValue</code></li>
        <li>Кнопка <strong>"Очистить форму"</strong> — сбрасывает все поля</li>
      </Requirements>

      <InterfaceDef
        name="ProductForm"
        code={`interface ProductForm {
  title: string
  description: string
  price: number
}`}
      />

      <Tip>
        <code>setValue('price', newValue)</code> — устанавливает значение поля
        <br />
        <code>getValues('price')</code> — получает текущее значение
      </Tip>

      {/* ============================================================
          TODO: Создайте форму и кнопки внутри TaskBlock
          
          1. Создайте форму с полями: title, description, price
          2. Добавьте кнопку "Заполнить тестовыми данными"
          3. Добавьте кнопку "Удвоить цену"
          4. Добавьте кнопку "Очистить форму"
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 1.4: formState
// ============================================

export function Task1_4_Template() {
  // TODO: Используйте formState для отображения состояния

  return (
    <TaskBlock taskNumber="1.4" title="formState — состояние формы">
      <Requirements>
        <li>Создайте форму с полями <code>email</code> и <code>password</code></li>
        <li>Отображайте индикатор валидности формы (✅ зелёный / ❌ красный)</li>
        <li>Показывайте счётчик ошибок: <strong>"Ошибок: 0"</strong></li>
        <li>Статус отправки: <strong>"Отправка..."</strong> во время submit</li>
        <li>Статус dirty: <strong>"Форма изменена"</strong>, если поля менялись</li>
      </Requirements>

      <InterfaceDef
        name="LoginForm"
        code={`interface LoginForm {
  email: string
  password: string
}`}
      />

      <Tip>
        Деструктуризация из <code>formState</code>:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`const { formState: { errors, isValid, isSubmitting, isDirty } } = useForm()`}
        </pre>
      </Tip>

      {/* ============================================================
          TODO: Создайте форму и индикаторы состояния внутри TaskBlock
          
          1. Создайте форму с полями email и password
          2. Добавьте индикатор валидности (✅/❌)
          3. Добавьте счётчик ошибок
          4. Добавьте статус отправки и dirty статус
          ============================================================ */}
    </TaskBlock>
  )
}
