import { useForm, useFieldArray } from 'react-hook-form'
import { TaskBlock, Requirements, Tip, InterfaceDef, CodeExample } from '../../components/TaskBlock'

// ============================================
// Задание 5.1: useFieldArray
// ============================================

export function Task5_1_Template() {
  // TODO: Инициализируйте useForm с defaultValues: { emails: [{ value: '' }] }
  // TODO: Инициализируйте useFieldArray({ control, name: 'emails' })

  const { control, register, handleSubmit } = useForm()
  // const { fields, append, remove } = useFieldArray(...)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="5.1" title="useFieldArray">
      <Requirements>
        <li>Минимум одно поле email по умолчанию</li>
        <li>Кнопка <strong>"+ Добавить"</strong> добавляет новое поле email</li>
        <li>Кнопка <strong>"✕"</strong> удаляет конкретное поле</li>
        <li>Валидация email формата для каждого поля</li>
      </Requirements>

      <InterfaceDef
        name="EmailsForm"
        code={`interface EmailsForm {
  emails: { value: string }[]
}`}
      />

      <Tip>
        <code>useFieldArray</code> возвращает <code>fields</code>, <code>append</code>, <code>remove</code> для управления массивом.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Инициализируйте useForm с defaultValues: { emails: [{ value: '' }] }
          2. Инициализируйте useFieldArray({ control, name: 'emails' })
          3. Мапьте fields для рендеринга полей email с кнопкой удаления
          4. Кнопка "+ Добавить" вызывает append({ value: '' })
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 5.2: Условные поля
// ============================================

export function Task5_2_Template() {
  // TODO: Используйте watch для получения contactMethod
  // TODO: Отображайте поле в зависимости от выбора

  const { register, handleSubmit } = useForm()
  // const contactMethod = watch('contactMethod')

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="5.2" title="Условные поля">
      <Requirements>
        <li>Select для выбора способа связи: email / телефон / telegram</li>
        <li>Отображается только поле выбранного типа</li>
        <li>Валидация применяется только к видимому полю</li>
        <li>При смене способа связи предыдущее значение сбрасывается</li>
      </Requirements>

      <InterfaceDef
        name="ContactForm"
        code={`interface ContactForm {
  contactMethod: 'email' | 'phone' | 'telegram'
  email?: string
  phone?: string
  telegram?: string
}`}
      />

      <Tip>
        Используйте <code>watch('contactMethod')</code> для отслеживания выбора и условного рендеринга полей.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте select для выбора contactMethod (email/phone/telegram)
          2. Используйте watch для получения выбранного значения
          3. Условно рендерьте поле только для выбранного типа связи
          4. Валидация применяется только к видимому полю
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 5.3: Зависимые поля
// ============================================

export function Task5_3_Template() {
  // TODO: Используйте watch для получения country
  // TODO: При смене страны сбрасывайте город через setValue

  const { register, handleSubmit } = useForm()
  // const country = watch('country')
  // const cities = country ? citiesByCountry[country] : []

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="5.3" title="Зависимые поля">
      <Requirements>
        <li>Выбор страны: Россия, USA, Германия</li>
        <li>Города зависят от выбранной страны</li>
        <li>При смене страны город сбрасывается автоматически</li>
        <li>Оба поля обязательные</li>
      </Requirements>

      <InterfaceDef
        name="LocationForm"
        code={`interface LocationForm {
  country: 'Россия' | 'USA' | 'Германия'
  city: string
}`}
      />

      <CodeExample
        label="Данные городов:"
        code={`const citiesByCountry = {
  'Россия': ['Москва', 'Санкт-Петербург', 'Казань'],
  'USA': ['New York', 'Los Angeles', 'Chicago'],
  'Германия': ['Berlin', 'Munich', 'Hamburg']
}`}
      />

      <Tip>
        Используйте <code>setValue('city', '')</code> для сброса города при смене страны.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Создайте select для выбора country (Россия, USA, Германия)
          2. Создайте select для city с зависимыми данными от country
          3. При смене страны вызывайте setValue('city', '')
          4. Оба поля обязательные
          ============================================================ */}
    </TaskBlock>
  )
}

// ============================================
// Задание 5.4: Wizard (multi-step форма)
// ============================================

export function Task5_4_Template() {
  // TODO: Используйте useState для step
  // TODO: Используйте trigger для валидации перед переходом

  const { register, handleSubmit } = useForm()
  // const [step, setStep] = useState(1)
  // const onNext = async () => { const valid = await trigger(...); if (valid) setStep(s => s + 1) }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <TaskBlock taskNumber="5.4" title="Wizard (multi-step форма)">
      <Requirements>
        <li><strong>Шаг 1:</strong> Имя и Email</li>
        <li><strong>Шаг 2:</strong> Адрес доставки (street, city, zip)</li>
        <li><strong>Шаг 3:</strong> Комментарий к заказу</li>
        <li>Кнопка <strong>"Назад"</strong> (кроме шага 1)</li>
        <li>Кнопка <strong>"Далее"</strong> с проверкой валидации</li>
        <li>Кнопка <strong>"Отправить"</strong> на последнем шаге</li>
      </Requirements>

      <InterfaceDef
        name="OrderForm"
        code={`interface OrderForm {
  firstName: string
  email: string
  street: string
  city: string
  zip: string
  comment: string
}`}
      />

      <Tip>
        Используйте <code>trigger(['firstName', 'email'])</code> для валидации полей текущего шага перед переходом.
      </Tip>

      {/* ============================================================
          TODO: Создайте форму внутри TaskBlock, после компонента Tip
          
          1. Используйте useState для отслеживания текущего шага (step)
          2. Шаг 1: firstName, email; Шаг 2: street, city, zip; Шаг 3: comment
          3. Кнопка "Далее" вызывает trigger() для валидации перед переходом
          4. Кнопка "Назад" доступна кроме шага 1, "Отправить" на последнем шаге
          ============================================================ */}
    </TaskBlock>
  )
}
