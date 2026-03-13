import { useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 6.1: Dirty / Touched States
// ============================================

export function Task6_1_Template() {
  // TODO: Получите dirtyFields, touchedFields, isDirty из formState

  const { register } = useForm()

  return (
    <TaskBlock taskNumber="6.1" title="Dirty / Touched States">
      <Requirements>
        <li>Отображайте <strong>Dirty</strong> статус для каждого поля (✅/❌)</li>
        <li>Отображайте <strong>Touched</strong> статус для каждого поля (✅/❌)</li>
        <li>Отображайте общий <strong>isDirty</strong> статус формы</li>
        <li>Поля: username, email, password</li>
      </Requirements>

      <InterfaceDef
        name="ProfileForm"
        code={`interface ProfileForm {
  username: string
  email: string
  password: string
}`}
      />

      <Tip>
        Деструктуризация из formState:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`const { formState: { dirtyFields, touchedFields, isDirty } } = useForm()`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 6.2: Reset и Default Values
// ============================================

export function Task6_2_Template() {
  // TODO: Инициализируйте useForm с defaultValues
  // TODO: Используйте reset для сброса и заполнения

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="6.2" title="Reset и Default Values">
      <Requirements>
        <li>Поля: username, email, role</li>
        <li>Кнопка <strong>"Заполнить"</strong> — заполняет форму тестовыми данными</li>
        <li>Кнопка <strong>"Сбросить"</strong> — возвращает к начальным значениям</li>
        <li>Отображение последних отправленных данных</li>
      </Requirements>

      <InterfaceDef
        name="UserForm"
        code={`interface UserForm {
  username: string
  email: string
  role: string
}`}
      />

      <Tip>
        <code>reset(&#123; username: 'John', email: 'john@example.com' &#125;)</code> — заполняет форму новыми значениями.
        <br />
        <code>reset()</code> — сбрасывает к начальным значениям.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 6.3: Focus Management
// ============================================

export function Task6_3_Template() {
  // TODO: Используйте useEffect для фокуса на первом ошибочном поле

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="6.3" title="Focus Management">
      <Requirements>
        <li>Поля: email, password, confirm</li>
        <li>При ошибке валидации фокус автоматически переходит на первое ошибочное поле</li>
        <li>Отображайте сообщения об ошибках</li>
        <li>Используйте ref для управления фокусом</li>
      </Requirements>

      <InterfaceDef
        name="LoginForm"
        code={`interface LoginForm {
  email: string
  password: string
  confirm: string
}`}
      />

      <Tip>
        Сохраните refs для полей и используйте <code>focus()</code> после валидации.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 6.4: Accessibility (ARIA)
// ============================================

export function Task6_4_Template() {
  // TODO: Добавьте aria-invalid, aria-describedby, role="alert"

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="6.4" title="Accessibility (ARIA)">
      <Requirements>
        <li><code>aria-invalid</code> для полей с ошибками</li>
        <li><code>aria-describedby</code> для связи поля с сообщением об ошибке</li>
        <li><code>role="alert"</code> для сообщений об ошибках</li>
        <li><code>noValidate</code> для формы (отключает браузерную валидацию)</li>
      </Requirements>

      <InterfaceDef
        name="LoginForm"
        code={`interface LoginForm {
  email: string
  password: string
}`}
      />

      <Tip>
        Пример ARIA-атрибутов:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`<input
  {...register('email', { required: true })}
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
<span id="email-error" role="alert">
  {errors.email?.message}
</span>`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 6.5: Performance Оптимизация
// ============================================

export function Task6_5_Template() {
  // TODO: Используйте watch и считайте рендеры

  const { register, watch } = useForm()
  const values = watch()

  return (
    <TaskBlock taskNumber="6.5" title="Performance Оптимизация">
      <Requirements>
        <li>Поле <code>text</code> с <code>watch</code></li>
        <li>Счётчик рендеров формы</li>
        <li>Демонстрация ре-рендеров от watch</li>
        <li>Используйте <code>useMemo</code> для оптимизации</li>
      </Requirements>

      <InterfaceDef
        name="PerformanceForm"
        code={`interface PerformanceForm {
  text: string
}`}
      />

      <Tip>
        <code>watch</code> вызывает ре-рендер при каждом изменении. Используйте <code>useMemo</code> для тяжёлых вычислений.
      </Tip>
    </TaskBlock>
  )
}
