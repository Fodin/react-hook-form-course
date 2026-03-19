import { useLanguage } from '../hooks'

export function TaskStub({ id }: { id: string }) {
  const { t } = useLanguage()
  return (
    <div className="exercise-container">
      <h2>
        {t('task.title')} {id}
      </h2>
      <p>{t('task.placeholder')}</p>
    </div>
  )
}
