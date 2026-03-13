import { Controller, useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 4.1: Controller для кастомных компонентов
// ============================================

export function Task4_1_Template() {
  // TODO: Используйте Controller для кастомного селекта

  const { control } = useForm()

  return (
    <TaskBlock taskNumber="4.1" title="Controller для кастомных компонентов">
      <Requirements>
        <li>Создайте кастомный компонент Select</li>
        <li>Используйте <code>Controller</code> для интеграции с react-hook-form</li>
        <li>Поле <code>country</code> должно быть обязательным</li>
        <li>Отображайте ошибку валидации</li>
      </Requirements>

      <InterfaceDef
        name="CountryForm"
        code={`interface CountryForm {
  country: string
}`}
      />

      <Tip>
        <code>Controller</code> оборачивает кастомные компоненты:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`<Controller
  name="country"
  control={control}
  render={({ field }) => <Select {...field} />}
/>`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 4.2: Radio и Select
// ============================================

export function Task4_2_Template() {
  // TODO: Реализуйте radio и select поля

  return (
    <TaskBlock taskNumber="4.2" title="Radio и Select">
      <Requirements>
        <li><code>gender</code>: radio кнопки (male, female, other)</li>
        <li><code>country</code>: select (USA, Russia, Germany, France)</li>
        <li>Оба поля обязательные</li>
        <li>Отображайте выбранное значение</li>
      </Requirements>

      <InterfaceDef
        name="ProfileForm"
        code={`interface ProfileForm {
  gender: 'male' | 'female' | 'other'
  country: 'USA' | 'Russia' | 'Germany' | 'France'
}`}
      />

      <Tip>
        Для radio используйте <code>register</code> с одинаковым <code>name</code> и разными <code>value</code>.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 4.3: Checkbox
// ============================================

export function Task4_3_Template() {
  // TODO: Реализуйте одиночный и множественный checkbox

  return (
    <TaskBlock taskNumber="4.3" title="Checkbox">
      <Requirements>
        <li><code>agree</code>: одиночный checkbox "Согласен с правилами" (обязательное)</li>
        <li><code>skills</code>: множественный выбор (React, Vue, Angular, Svelte)</li>
        <li>Минимум один навык должен быть выбран</li>
      </Requirements>

      <InterfaceDef
        name="SkillsForm"
        code={`interface SkillsForm {
  agree: boolean
  skills: string[]
}`}
      />

      <Tip>
        Для множественного checkbox используйте массив в качестве значения.
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 4.4: File Upload
// ============================================

export function Task4_4_Template() {
  // TODO: Реализуйте загрузку файла с валидацией

  return (
    <TaskBlock taskNumber="4.4" title="File Upload">
      <Requirements>
        <li>Тип файла: только изображения (jpeg, png, gif)</li>
        <li>Размер: максимум 2MB</li>
        <li>Предпросмотр изображения после выбора</li>
        <li>Отображайте ошибку при неверном формате/размере</li>
      </Requirements>

      <InterfaceDef
        name="AvatarForm"
        code={`interface AvatarForm {
  avatar: FileList
}`}
      />

      <Tip>
        Валидируйте файл в <code>validate</code>:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`validate: {
  type: v => v[0]?.type.startsWith('image/'),
  size: v => v[0]?.size < 2 * 1024 * 1024
}`}
        </pre>
      </Tip>
    </TaskBlock>
  )
}

// ============================================
// Задание 4.5: Дата и время
// ============================================

export function Task4_5_Template() {
  // TODO: Реализуйте поля даты и времени

  return (
    <TaskBlock taskNumber="4.5" title="Дата и время">
      <Requirements>
        <li><code>birthDate</code>: date (дата рождения)</li>
        <li><code>appointment</code>: datetime-local (запись на встречу)</li>
        <li>Дата рождения: пользователь должен быть старше 18 лет</li>
        <li>Встреча: не может быть в прошлом</li>
      </Requirements>

      <InterfaceDef
        name="DateForm"
        code={`interface DateForm {
  birthDate: string
  appointment: string
}`}
      />

      <Tip>
        Используйте <code>type="date"</code> и <code>type="datetime-local"</code> для input.
      </Tip>
    </TaskBlock>
  )
}
