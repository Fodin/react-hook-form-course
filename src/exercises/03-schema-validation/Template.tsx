// ============================================
// Задание 3.1: Базовая валидация с Zod
// ============================================

// TODO: Импортируйте z из 'zod'
// TODO: Импортируйте zodResolver из '@hookform/resolvers/zod'

// TODO: Создайте схему
// const schema = z.object({ ... })

// TODO: Выведите тип
// type FormData = z.infer<typeof schema>

export function Task3_1_Template() {
  // TODO: Используйте useForm с zodResolver
  
  return (
    <div className="exercise-container">
      <h2>Задание 3.1: Базовая валидация с Zod</h2>
      
      {/* Поля: email, password, confirmPassword, age */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>email: email формат, обязательно</li>
          <li>password: минимум 8 символов</li>
          <li>confirmPassword: должно совпадать с password</li>
          <li>age: число от 18 до 120</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 3.2: Валидация с Yup
// ============================================

// TODO: Импортируйте yup
// TODO: Импортируйте yupResolver

export function Task3_2_Template() {
  // TODO: Перепишите схему с Yup
  
  return (
    <div className="exercise-container">
      <h2>Задание 3.2: Валидация с Yup</h2>
      
      {/* Та же форма что в 3.1, но с Yup */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Задание:</h3>
        <p>Перепишите форму из 3.1 используя Yup вместо Zod</p>
      </div>
    </div>
  )
}

// ============================================
// Задание 3.3: Сложные схемы
// ============================================

// TODO: Создайте сложную схему с объектами, массивами, enum

export function Task3_3_Template() {
  // TODO: Реализуйте форму анкеты
  
  return (
    <div className="exercise-container">
      <h2>Задание 3.3: Сложные схемы</h2>
      
      {/* Поля: personalInfo, contacts, skills, role, bio */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Поля:</h3>
        <ul>
          <li>personalInfo: firstName, lastName, age</li>
          <li>contacts: массив объектов type, value</li>
          <li>skills: массив строк (минимум 1)</li>
          <li>role: enum (developer, designer, manager)</li>
          <li>bio: опционально, макс. 500 символов</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 3.4: Кастомные сообщения и refine
// ============================================

export function Task3_4_Template() {
  // TODO: Используйте .refine() для cross-field валидации
  
  return (
    <div className="exercise-container">
      <h2>Задание 3.4: refine и кастомные сообщения</h2>
      
      {/* Форма смены пароля с refine */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Требования:</h3>
        <ul>
          <li>Пароли должны совпадать</li>
          <li>Новый пароль должен отличаться от текущего</li>
          <li>Используйте .refine()</li>
        </ul>
      </div>
    </div>
  )
}

// ============================================
// Задание 3.5: Сравнение Zod vs Yup
// ============================================

export function Task3_5_Template() {
  return (
    <div className="exercise-container">
      <h2>Задание 3.5: Сравнение Zod vs Yup</h2>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Вопросы для анализа:</h3>
        <ol>
          <li>Что понравилось больше в Zod?</li>
          <li>Что понравилось больше в Yup?</li>
          <li>Какую библиотеку выбрали бы для проекта и почему?</li>
        </ol>
        
        <textarea 
          placeholder="Напишите ваш анализ здесь..." 
          rows={10}
          style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
        />
      </div>
    </div>
  )
}
