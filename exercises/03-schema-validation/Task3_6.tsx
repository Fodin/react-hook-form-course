import { useLanguage } from 'src/hooks'

// ============================================
// Задание 3.6: superRefine и discriminatedUnion
// Task 3.6: superRefine and discriminatedUnion
// ============================================

// TODO: Создайте форму оплаты с динамическими полями в зависимости от метода оплаты
// TODO: Create a payment form with dynamic fields depending on payment method
//
// 1. Используйте z.discriminatedUnion для схемы оплаты (card / bank / crypto)
// 1. Use z.discriminatedUnion for payment schema (card / bank / crypto)
//
// 2. Для карты: cardNumber (16 цифр), expiry (MM/YY), cvv (3 цифры)
// 2. For card: cardNumber (16 digits), expiry (MM/YY), cvv (3 digits)
//
// 3. Для банка: accountNumber (мин. 20 символов), bankName
// 3. For bank: accountNumber (min 20 chars), bankName
//
// 4. Для крипто: walletAddress (мин. 26 символов), network (ethereum/bitcoin/solana)
// 4. For crypto: walletAddress (min 26 chars), network (ethereum/bitcoin/solana)
//
// 5. Используйте superRefine для cross-field валидации:
// 5. Use superRefine for cross-field validation:
//    - Крипто: минимальная сумма 10 / Crypto: minimum amount 10
//    - Карта: максимальная сумма 100000 / Card: maximum amount 100000

export function Task3_6() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.6')}</h2>

      {/* TODO: Реализуйте форму оплаты здесь */}
      {/* TODO: Implement payment form here */}
    </div>
  )
}
