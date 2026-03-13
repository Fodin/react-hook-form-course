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

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте кастомный компонент TextField с label и error
          2. Создайте кастомный компонент Button с состоянием loading
          3. Используйте Controller для интеграции компонентов с формой
          4. Реализуйте форму входа с email и password
          ============================================================ */}
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

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте хук useFormPersist(name, defaultValues)
          2. Хук возвращает: stored (данные из localStorage), save, clear
          3. Используйте хук в форме с полями title, content
          4. Реализуйте автовосстановление при загрузке
          ============================================================ */}
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

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Оберните форму в FormProvider
          2. Создайте PersonalStep с firstName, lastName (используйте useFormContext)
          3. Создайте ContactStep с email, phone (используйте useFormContext)
          4. Реализуйте навигацию между шагами
          ============================================================ */}
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

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте 2 поля: subject, body
          2. Используйте useEffect для автосохранения при каждом изменении
          3. Восстанавливайте данные из localStorage при загрузке
          4. Очищайте localStorage после успешной отправки
          5. Отображайте индикатор последнего сохранения
          ============================================================ */}
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

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Шаг 1: Аккаунт (email, password, confirmPassword) с async валидацией
          2. Шаг 2: Профиль (firstName, lastName, avatar с предпросмотром)
          3. Шаг 3: Настройки (newsletter, notifications — checkbox)
          4. Валидация перед переходом, сохранение между шагами
          5. Финальный просмотр всех данных перед отправкой
          ============================================================ */}
    </TaskBlock>
  )
}
