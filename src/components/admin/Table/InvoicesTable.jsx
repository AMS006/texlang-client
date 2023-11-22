import { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { invoiceTableColumn } from '../../../data/tableColumns';
import TableLoader from '../../Loader/Table';


const InvoicesTable = () => {
    const { invoices, loading } = useSelector((state) => state.invoice)
    const data = useMemo(() => invoices, [invoices])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: invoiceTableColumn,
            data,
        },
    );
    return (
        <div className='overflow-x-auto py-4'>
            <table {...getTableProps()} className="table overflow-auto">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {rows.length > 0 ? (
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan={invoiceTableColumn.length} className="text-center py-1.5 border w-full">
                                {loading ? <TableLoader /> : 'No Records Found'}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default InvoicesTable
