import { useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 8.1: Интеграция с UI-библиотекой
// ============================================

export function Task8_1_Template() {
  // TODO: Создайте кастомные компоненты TextField и Button
  // TODO: Используйте Controller для интеграции

  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="8.1" title="Интеграция с UI-библиотекой">
      <Requirements>
        <li>Создайте кастомный компонент <code>TextField</code> с label и error</li>
        <li>Создайте кастомный компонент <code>Button</code> с состоянием loading</li>
        <li>Используйте <code>Controller</code> для интеграции с react-hook-form</li>
        <li>Реализуйте форму входа</li>
      </Requirements>

      <InterfaceDef
        name="LoginForm"
        code={`interface LoginForm {
  email: string
  password: string
}`}
      />

      <Tip>
        Controller передаёт <code>field.onChange</code>, <code>field.onBlur</code>, <code>field.value</code> в кастомный компонент.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 8.2: Кастомные Хуки
// ============================================

export function Task8_2_Template() {
  // TODO: Создайте хук useFormPersist
  // TODO: Используйте хук в форме

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="8.2" title="Кастомные Хуки">
      <Requirements>
        <li>Создайте хук <code>useFormPersist(name, defaultValues)</code></li>
        <li>Хук возвращает: <code>stored</code>, <code>save</code>, <code>clear</code></li>
        <li>Сохранение данных в <code>localStorage</code></li>
        <li>Автоматическое восстановление при загрузке</li>
      </Requirements>

      <InterfaceDef
        name="DraftForm"
        code={`interface DraftForm {
  title: string
  content: string
}`}
      />

      <Tip>
        Пример использования:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`const { stored, save, clear } = useFormPersist('my-form')`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 8.3: FormContext
// ============================================

export function Task8_3_Template() {
  // TODO: Используйте FormProvider и useFormContext

  const { handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="8.3" title="FormContext">
      <Requirements>
        <li>Используйте <code>FormProvider</code> для обёртки формы</li>
        <li>Создайте <code>PersonalStep</code> с firstName, lastName</li>
        <li>Создайте <code>ContactStep</code> с email, phone</li>
        <li>Реализуйте навигацию между шагами</li>
        <li>Используйте <code>useFormContext</code> в подкомпонентах</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
}`}
      />

      <Tip>
        <code>useFormContext()</code> даёт доступ к методам формы из вложенных компонентов без prop drilling.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 8.4: localStorage Persistence
// ============================================

export function Task8_4_Template() {
  // TODO: Сохраняйте данные формы в localStorage
  // TODO: Восстанавливайте при загрузке

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="8.4" title="localStorage Persistence">
      <Requirements>
        <li>Поля: <code>subject</code>, <code>body</code></li>
        <li>Автосохранение при каждом изменении</li>
        <li>Восстановление данных при загрузке страницы</li>
        <li>Очистка localStorage после успешной отправки</li>
        <li>Индикатор последнего сохранения</li>
      </Requirements>

      <InterfaceDef
        name="EmailDraftForm"
        code={`interface EmailDraftForm {
  subject: string
  body: string
}`}
      />

      <Tip>
        Используйте <code>useEffect</code> для автосохранения и <code>defaultValues</code> для восстановления.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 8.5: Финальный Проект
// ============================================

export function Task8_5_Template() {
  // TODO: Создайте форму регистрации в 3 шага
  // TODO: Используйте все изученные техники

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="8.5" title="Финальный Проект">
      <Requirements>
        <li><strong>Шаг 1: Аккаунт</strong> — email, password, confirm password</li>
        <li><strong>Шаг 2: Профиль</strong> — firstName, lastName, avatar (file upload)</li>
        <li><strong>Шаг 3: Настройки</strong> — newsletter (checkbox), notifications (checkbox)</li>
        <li>Валидация перед переходом на следующий шаг</li>
        <li>Сохранение данных между шагами</li>
        <li>Предпросмотр всех данных перед отправкой</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  // Step 1
  email: string
  password: string
  confirmPassword: string
  // Step 2
  firstName: string
  lastName: string
  avatar: FileList
  // Step 3
  newsletter: boolean
  notifications: boolean
}`}
      />

      <Tip>
        Используйте все изученные техники:
        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
          <li>useFieldArray для динамических полей</li>
          <li>Controller для кастомных компонентов</li>
          <li>Async валидацию для email</li>
          <li>FormProvider для доступа к форме из шагов</li>
          <li>localStorage для сохранения черновика</li>
        </ul>
      </Tip>
    </TaskBlock>
  )
}
