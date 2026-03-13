import { useForm } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef } from '../../components/TaskBlock'

// ============================================
// Задание 2.1: Built-in валидация
// ============================================

export function Task2_1_Template() {
  // TODO: Добавьте правила валидации: required, minLength, maxLength, min, max

  return (
    <TaskBlock taskNumber="2.1" title="Built-in валидация">
      <Requirements>
        <li><code>username</code>: 3-20 символов, обязательное поле</li>
        <li><code>email</code>: email формат, обязательное поле</li>
        <li><code>age</code>: число от 18 до 120, обязательное поле</li>
        <li><code>password</code>: минимум 6 символов, обязательное поле</li>
      </Requirements>

      <InterfaceDef
        name="RegistrationForm"
        code={`interface RegistrationForm {
  username: string
  email: string
  age: number
  password: string
}`}
      />

      <Tip>
        Используйте <code>required</code>, <code>minLength</code>, <code>maxLength</code>, <code>min</code>, <code>max</code> в правилах валидации.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте форму с 4 полями: username, email, age, password
          2. Добавьте правила валидации: required, minLength, maxLength, min, max
          3. Отображайте ошибки под каждым полем
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 2.2: Pattern валидация
// ============================================

export function Task2_2_Template() {
  // TODO: Используйте pattern для валидации полей

  return (
    <TaskBlock taskNumber="2.2" title="Pattern валидация">
      <Requirements>
        <li><code>phone</code>: формат +7 XXX XXX-XX-XX</li>
        <li><code>website</code>: должен начинаться с https://</li>
        <li><code>hexColor</code>: #FFF или #FFFFFF</li>
        <li><code>slug</code>: только строчные буквы и дефисы</li>
      </Requirements>

      <InterfaceDef
        name="PatternForm"
        code={`interface PatternForm {
  phone: string
  website: string
  hexColor: string
  slug: string
}`}
      />

      <Tip>
        Используйте <code>pattern</code> с RegExp для валидации по маске.
        <br />
        Пример: <code>pattern=&#123;/^https:\/\/.+/&#125;</code>
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте форму с 4 полями: phone, website, hexColor, slug
          2. Используйте pattern с RegExp для каждого поля
          3. Отображайте ошибки при несоответствии паттерну
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 2.3: Custom валидация
// ============================================

export function Task2_3_Template() {
  // TODO: Используйте validate объект для парольной валидации

  return (
    <TaskBlock taskNumber="2.3" title="Custom валидация пароля">
      <Requirements>
        <li>Минимум 8 символов</li>
        <li>Хотя бы одна заглавная буква</li>
        <li>Хотя бы одна цифра</li>
        <li>Хотя бы один специальный символ</li>
      </Requirements>

      <InterfaceDef
        name="PasswordForm"
        code={`interface PasswordForm {
  password: string
}`}
      />

      <Tip>
        Используйте <code>validate</code> как объект функций:
        <pre style={{ margin: '0.5rem 0 0 0', padding: '0.75rem', background: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
          {`validate: {
  minLength: v => v.length >= 8,
  uppercase: v => /[A-Z]/.test(v),
  number: v => /\\d/.test(v),
  special: v => /[!@#$%^&*]/.test(v)
}`}
        </pre>
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте форму с полем password
          2. Используйте validate объект с 4 функциями проверки
          3. Отображайте конкретную ошибку для каждой проверки
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 2.4: Cross-field валидация
// ============================================

export function Task2_4_Template() {
  // TODO: Используйте watch для получения значения newPassword
  // TODO: Валидируйте confirmPassword против newPassword

  return (
    <TaskBlock taskNumber="2.4" title="Cross-field валидация">
      <Requirements>
        <li><code>currentPassword</code>: обязательное поле</li>
        <li><code>newPassword</code>: обязательное, минимум 8 символов</li>
        <li><code>confirmPassword</code>: должно совпадать с newPassword</li>
        <li><code>newPassword</code> не должен совпадать с currentPassword</li>
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
        Используйте <code>watch('newPassword')</code> для получения значения и сравнения в <code>validate</code>.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте форму с 3 полями: currentPassword, newPassword, confirmPassword
          2. Используйте watch для получения значения newPassword
          3. В confirmPassword добавьте validate с проверкой совпадения
          4. Проверьте что newPassword не совпадает с currentPassword
          ============================================================ */}
    </TaskBlock>
  )
}
