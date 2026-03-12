import { useForm } from 'react-hook-form'

// TODO: Определите интерфейс для данных формы
// interface LoginForm { ... }

export function Template() {
  // TODO: Инициализируйте useForm с типом LoginForm
  // const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Создайте функцию onSubmit для обработки данных
  // const onSubmit = (data: LoginForm) => { ... }

  return (
    <div className="exercise-container">
      <h2>Задание 0.1: Первая форма</h2>
      
      {/* TODO: Создайте форму с полями email и password */}
      {/* 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register('email')} placeholder="Введите email" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" {...register('password')} placeholder="Введите пароль" />
          </div>
          
          <button type="submit">Войти</button>
        </form>
      */}
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>📝 Инструкция:</h3>
        <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Откройте файл <code>Solution.tsx</code></li>
          <li>Скопируйте этот шаблон</li>
          <li>Выполните все TODO комментарии</li>
          <li>Сохраните и проверьте результат в браузере</li>
        </ol>
      </div>
    </div>
  )
}
