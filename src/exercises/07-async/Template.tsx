import { useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 7.1: Async Валидация
// ============================================

export function Task7_1_Template() {
  // TODO: Создайте функцию validateUsername с имитацией API
  // TODO: Используйте onBlur для запуска валидации

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="7.1" title="Async Валидация">
      <Requirements>
        <li>Поле <code>username</code> с async валидацией</li>
        <li>Статус проверки: <strong>"Проверка..."</strong> / <strong>"✅ Доступно"</strong> / <strong>"❌ Занято"</strong></li>
        <li>Занятые имена: <code>admin</code>, <code>user</code>, <code>test</code></li>
        <li>Имитация задержки API (500-1000ms)</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  username: string
  email: string
}`}
      />

      <Tip>
        Async валидация возвращает Promise:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`const validateUsername = async (value: string) => {
  await new Promise(r => setTimeout(r, 500))
  const busy = ['admin', 'user', 'test']
  return busy.includes(value) ? 'Занято' : true
}`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 7.2: Загрузка Данных (Edit Mode)
// ============================================

export function Task7_2_Template() {
  // TODO: Загрузите данные в useEffect и вызовите reset

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="7.2" title="Загрузка Данных (Edit Mode)">
      <Requirements>
        <li>Загрузка данных пользователя при монтировании компонента</li>
        <li>Отображение состояния загрузки (<strong>"Загрузка..."</strong>)</li>
        <li>Кнопка <strong>"Сохранить"</strong> активна только при наличии изменений</li>
        <li>Имитация API запроса</li>
      </Requirements>

      <InterfaceDef
        name="ProfileForm"
        code={`interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  bio: string
}`}
      />

      <Tip>
        Используйте <code>reset(data)</code> после загрузки данных и <code>isDirty</code> для отслеживания изменений.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 7.3: Submit с Loading/Error
// ============================================

export function Task7_3_Template() {
  // TODO: Используйте useState для submitting и error

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="7.3" title="Submit с Loading/Error">
      <Requirements>
        <li>Кнопка disabled во время отправки</li>
        <li>Текст кнопки: <strong>"Отправка..."</strong> / <strong>"Отправить"</strong></li>
        <li>Сообщение об ошибке при неудаче</li>
        <li>Сообщение об успехе после успешной отправки</li>
      </Requirements>

      <InterfaceDef
        name="ContactForm"
        code={`interface ContactForm {
  name: string
  email: string
  message: string
}`}
      />

      <Tip>
        Используйте <code>formState.isSubmitting</code> для отображения состояния отправки.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 7.4: Debounce для Автосохранения
// ============================================

export function Task7_4_Template() {
  // TODO: Используйте useEffect с setTimeout для debounce

  const { register, watch } = useForm()
  const values = watch()

  return (
    <TaskBlock taskNumber="7.4" title="Debounce для Автосохранения">
      <Requirements>
        <li>Автосохранение через 1 секунду после последнего изменения</li>
        <li>Индикатор <strong>"✓ Сохранено"</strong></li>
        <li>Сохранение в <code>localStorage</code></li>
        <li>Восстановление данных при загрузке</li>
      </Requirements>

      <InterfaceDef
        name="DraftForm"
        code={`interface DraftForm {
  title: string
  content: string
}`}
      />

      <Tip>
        Debounce с useEffect:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(values))
  }, 1000)
  return () => clearTimeout(timer)
}, [values])`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}
