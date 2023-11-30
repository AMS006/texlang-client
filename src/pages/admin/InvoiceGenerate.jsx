import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../layout'
import megdapLogo from '../../assets/megdapLogo.svg'
import TaxDetailTable from '../../components/admin/Table/TaxDetailsTable'
import InvoiceFileTable from '../../components/admin/Table/InvoiceFileTable'
import { generateProjectInvoice } from '../../redux/actions/admin/invoice'
import FullScreenLoader from '../../components/Loader/FullScreen'
import { companyBankDetails, companyDetails } from '../../data/constants'

const InvoiceGenerate = () => {
  const { selectedInvoice, loading } = useSelector((state) => state.invoice)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id)
      dispatch(generateProjectInvoice(id))
  }, [dispatch, id])

  if (loading)
    return <FullScreenLoader />
  return (
    <div className='px-6 py-8 font-sans'>
      <div className='flex justify-between items-center py-4'>
        <div>
          <img src={megdapLogo} alt="Megdap" className='max-w-[300px]' />
        </div>
        <div className='flex flex-col items-start'>
          <div className='flex items-center gap-1 font-semibold'>
            <span>Invoice No.</span>
            <span>{selectedInvoice?.invoiceNumber}</span>
          </div>
          <div className='flex items-center gap-1 font-semibold'>
            <span>User Id :</span>
            <span>{selectedInvoice?.userEmail}</span>
          </div>
          <div className='flex items-center gap-1 font-semibold'>
            <span>Department :</span>
            <span>{selectedInvoice?.department}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex justify-between items-start py-4 text-sm'>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold'>Company Details :</h3>
          <ul>
            <li className='font-semibold'>Megdap Innovation Labs Pvt. Ltd.</li>
            <li>201 Polekar heights bhau patil road</li>
            <li>Near Pune IT Park Maharashtra , 411020</li>
            <li>
              <span className='font-semibold'>GSTIN/UIN : </span>
              <span>{companyDetails.gstin}</span>
            </li>
            <li>
              <span className='font-semibold'>CIN : </span>
              <span>{companyDetails.cin}</span>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold'>Customer Details :</h3>
          <ul>
            <li>{selectedInvoice?.companyName}</li>
            <li>xx, xx</li>
            <li>Pune Maharashtra, 411020</li>
            <li>
              <span className='font-semibold'>GSTIN/UIN :</span>
              <span></span>
            </li>
            <li>
              <span className='font-semibold'>PAN/IT No. : </span>
              <span></span>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-semibold'>Company Bank Details :</h3>
          <ul>
            <li>
              <span className='font-semibold'>Bank Name : </span>
              <span>{companyBankDetails.name}</span>
            </li>
            <li>
              <span className='font-semibold'>A/c No. : </span>
              <span>{companyBankDetails.accNo}</span>
            </li>
            <li>
              <span className='font-semibold'>Branch & IFSC code : </span>
              <span>{companyBankDetails?.ifscCode}</span>
            </li>
            <li>
              <span className='font-semibold'>Company PAN : </span>
              <span>{companyBankDetails.pan}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <InvoiceFileTable />
      </div>
      <div className='flex flex-col gap-2.5'>
        <div className='w-full'>
          <h3 className='font-semibold'>Tax Details</h3>
          <TaxDetailTable />
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col text-sm'>
            <h3 className='font-semibold'>Declaration</h3>
            <p>We declare that this invoice show actual price of the goods described and that all particulars are true and correct</p>
            <h4 className='font-semibold uppercase'>for megdap innovation labs private limited</h4>
          </div>
          <div className='flex justify-end items-end'>
            <h3 className='font-semibold'>Authorized Signatory</h3>
          </div>
        </div>
      </div>
      <div className='flex items-end mt-2.5'>
        <button onClick={() => window.print()} className='bg-blue-500 text-white px-2.5 py-1.5 hover:bg-blue-600 no-print'>Print Invoice</button>
      </div>
    </div>
  )
}

export default Layout(InvoiceGenerate)
