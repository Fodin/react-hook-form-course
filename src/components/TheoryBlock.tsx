import { getTheoryPath } from '../exercises/exercisePaths'
import { useLanguage } from '../hooks'
import { CollapsibleMarkdown } from './CollapsibleMarkdown'
import { ScrollToTop } from './ScrollToTop'

interface TheoryBlockProps {
  level: string
}

export function TheoryBlock({ level }: TheoryBlockProps) {
  const { t } = useLanguage()

  return (
    <CollapsibleMarkdown path={getTheoryPath(level)} title={t('theory.title')}>
      <ScrollToTop />
    </CollapsibleMarkdown>
  )
}
