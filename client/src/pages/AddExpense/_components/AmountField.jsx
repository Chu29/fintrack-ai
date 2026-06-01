import { appStyles as ui } from '../../_components/appStyles'

const AmountField = ({ value, onChange }) => {
  return (
    <section>
      <p className={ui.form.sectionLabel}>Amount</p>
      <label className={ui.form.amountRow}>
        <span className={ui.form.currency}>$</span>
        <input
          type="text"
          inputMode="decimal"
          value={value ?? ''}
          onChange={onChange}
          placeholder="0.00"
          className={ui.form.amountInput}
          aria-label="Transaction amount"
        />
      </label>
    </section>
  )
}

export default AmountField
