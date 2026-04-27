import { appStyles as ui } from '../../_components/appStyles'

const AddExpenseHeader = () => {
  return (
    <header>
      <p className={ui.text.pageEyebrow}>New Entry</p>
      <h1 className={ui.text.pageTitle}>Log Transaction</h1>
    </header>
  )
}

export default AddExpenseHeader
