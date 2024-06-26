import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import ReactPaginate from 'react-paginate';
import './App.css';
import './css/OrderTable.css';

interface User {
    id: number;
    email: string;
    role: string;
}

interface Seed {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface Fertilizer {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    quantity_seed: number;
    quantity_fertilizer: number;
    user: User;
    seed: Seed;
    fertilizer: Fertilizer;
    status: string;
}

const OrdersTable: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        console.log('Fetching orders for page:', page, 'with pageSize:', pageSize);
        fetchOrders(page, pageSize);
    }, [page, pageSize]);

    const fetchOrders = async (page: number, pageSize: number) => {
        try {
            const response = await axios.get('http://localhost:4000/api/orders', {
                params: {
                    page: page + 1,  // Assuming the API is 1-indexed
                    pageSize
                }
            });
            console.log('API response:', response);

            const { data, total } = response.data;
            console.log('Data:', data, 'Total:', total);

            if (!Array.isArray(data)) {
                throw new Error('Expected data to be an array');
            }

            setOrders(data);
            setPageCount(Math.ceil(total / pageSize));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handlePageClick = (data: { selected: number }) => {
        setPage(data.selected);
    };

    const updateOrderStatus = useCallback(async (orderId: number, status: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        console.log(orderId, status, token);
        try {
            const response = await axios.put(`http://localhost:4000/api/orders/${orderId}/approve`, 
                { status },
                {
                    headers: {
                        authorization: token,
                    }
                }
            );
            if (response.status === 200) {
                fetchOrders(page, pageSize);
            }
        } catch (error) {
            console.error(`Error updating order status to ${status}:`, error);
        }
    }, [page, pageSize]);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'User Email',
                accessor: 'user.email',
            },
            {
                Header: 'Seed Name',
                accessor: 'seed.name',
            },
            {
                Header: 'Seed Quantity',
                accessor: 'quantity_seed',
            },
            {
                Header: 'Fertilizer Name',
                accessor: 'fertilizer.name',
            },
            {
                Header: 'Fertilizer Quantity',
                accessor: 'quantity_fertilizer',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ row }: { row: { original: Order } }) => (
                    <div>
                        <span>{row.original.status}</span>
                        {row.original.status === 'pending' && (
                            <div>
                                <button onClick={() => updateOrderStatus(row.original.id, 'approved')}>Approve</button>
                                <button onClick={() => updateOrderStatus(row.original.id, 'rejected')}>Reject</button>
                            </div>
                        )}
                    </div>
                )
            },
        ],
        [updateOrderStatus]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page: tablePage,
    } = useTable(
        {
            columns,
            data: orders,
            initialState: { pageIndex: page },
            manualPagination: true,
            pageCount,
        },
        usePagination
    );

    return (
        <div className="orders-table-container">
            <h1>Orders</h1>
            <table {...getTableProps()} className="orders-table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{ border: '1px solid black' }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {tablePage.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '10px' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default OrdersTable;
