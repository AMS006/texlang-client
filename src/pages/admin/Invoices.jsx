import { useEffect } from 'react'

import Layout from '../../layout'
import { useDispatch } from 'react-redux'
import InvoicesTable from '../../components/admin/Table/InvoicesTable';
import { getInvoices } from '../../redux/actions/admin/invoice';

const Invoices = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvoices())
  }, [dispatch])
  return (
    <div className='px-6 py-8'>
      <h1 className='text-2xl font-sans pb-2.5'>Invoices</h1>
      <hr />
      <InvoicesTable />
    </div>
  )
}

export default Layout(Invoices)
