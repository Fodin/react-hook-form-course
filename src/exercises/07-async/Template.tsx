import { useForm } from 'react-hook-form'

// ============================================
// Задание 7.1: Async валидация
// ============================================

export function Task7_1_Template() {
  // TODO: Создайте функцию validateUsername с имитацией API
  // TODO: Используйте onBlur для запуска валидации
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 7.1: Async Валидация</h2>
      
      {/* TODO: Форма с username и email */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Username с async валидацией</li>
          <li>Статус: "Проверка..." / "✅ Доступно" / "❌ Занято"</li>
          <li>Занятые имена: admin, user, test</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 7.2: Загрузка данных
// ============================================

export function Task7_2_Template() {
  // TODO: Загрузите данные в useEffect и вызовите reset
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 7.2: Загрузка Данных (Edit Mode)</h2>
      
      {/* TODO: Форма с загрузкой данных */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Загрузка данных при монтировании</li>
          <li>Отображение состояния загрузки</li>
          <li>Кнопка "Сохранить" активна только при изменениях</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 7.3: Submit с loading/error
// ============================================

export function Task7_3_Template() {
  // TODO: Используйте useState для submitting и error
  
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="exercise-container">
      <h2>Задание 7.3: Submit с Loading/Error</h2>
      
      {/* TODO: Форма с обработкой loading/error */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Кнопка disabled во время отправки</li>
          <li>Текст кнопки: "Отправка..." / "Отправить"</li>
          <li>Сообщение об ошибке при неудаче</li>
          <li>Сообщение об успехе после отправки</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 7.4: Debounce для автосохранения
// ============================================

export function Task7_4_Template() {
  // TODO: Используйте useEffect с setTimeout для debounce
  
  const { register, watch } = useForm()
  const values = watch()

  return (
    <div className="exercise-container">
      <h2>Задание 7.4: Debounce для Автосохранения</h2>
      
      {/* TODO: Форма с автосохранением */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Автосохранение через 1 сек после изменения</li>
          <li>Индикатор "✓ Сохранено"</li>
          <li>Сохранение в localStorage</li>
        </ul>
      </div>
    </div>
  )
}
