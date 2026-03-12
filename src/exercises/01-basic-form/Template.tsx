import { useForm } from 'react-hook-form'

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
    <div className="exercise-container">
      <h2>Задание 1.1: Форма регистрации</h2>
      
      {/* TODO: Создайте форму с полями */}
      {/* firstName, lastName, email, age, bio, website */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Поля для реализации:</h3>
        <ul>
          <li>firstName — текст (обязательное)</li>
          <li>lastName — текст (обязательное)</li>
          <li>email — email (обязательное)</li>
          <li>age — число, от 18 до 100 (обязательное)</li>
          <li>bio — textarea (необязательное)</li>
          <li>website — URL (необязательное)</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 1.2: Watch для отслеживания
// ============================================

export function Task1_2_Template() {
  // TODO: Используйте watch для отслеживания username и password
  
  return (
    <div className="exercise-container">
      <h2>Задание 1.2: Watch в реальном времени</h2>
      
      {/* TODO: Создайте форму с username и password */}
      {/* Отображайте длину username и силу пароля */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Username: отображать длину в реальном времени</li>
          <li>Password: показывать "Слабый/Средний/Сильный"</li>
          <li>Использовать watch для реактивности</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 1.3: setValue и getValues
// ============================================

export function Task1_3_Template() {
  // TODO: Используйте setValue для программного изменения значений
  
  return (
    <div className="exercise-container">
      <h2>Задание 1.3: setValue и getValues</h2>
      
      {/* TODO: Создайте форму с title, description, price */}
      {/* Добавьте кнопки для управления значениями */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Кнопки:</h3>
        <ul>
          <li>"Заполнить тестовыми данными"</li>
          <li>"Удвоить цену" (читает price через getValues, умножает, ставит через setValue)</li>
          <li>"Очистить форму"</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 1.4: formState
// ============================================

export function Task1_4_Template() {
  // TODO: Используйте formState для отображения состояния
  
  return (
    <div className="exercise-container">
      <h2>Задание 1.4: formState — состояние формы</h2>
      
      {/* TODO: Создайте форму и отображайте состояние */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Отображать:</h3>
        <ul>
          <li>Индикатор валидности (✅/❌)</li>
          <li>Счётчик ошибок</li>
          <li>Статус отправки</li>
          <li>Статус dirty (изменена ли форма)</li>
        </ul>
      </div>
    </div>
  )
}
