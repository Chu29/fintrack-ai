import { appStyles as ui } from '../../_components/appStyles'

const InternalNotesField = ({ value, onChange }) => {
  return (
    <section>
      <p className={ui.form.sectionLabel}>Internal Notes</p>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Add details about this curator entry..."
        className={ui.form.textArea}
      />
    </section>
  )
}

export default InternalNotesField
