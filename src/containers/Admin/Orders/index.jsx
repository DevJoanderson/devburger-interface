
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import { api } from "../../../services/api";
import { useEffect, useState } from 'react';
import { orderStatusOptions } from './oderStatus';
import { FilterOption, Filter } from './styles';


export function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState(0);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function loadOrders() {
            const { data } = await api.get('orders');
            setOrders(data);
            setFilteredOrders(data);
        }
        loadOrders();
    }, []);

    const getUserName = (user) =>
        user && typeof user === 'object' ? user.name ?? 'Cliente desconhecido' : 'Cliente desconhecido';

    const createData = (order) => ({
        name: getUserName(order.user),
        orderId: order._id,
        date: order.createdAt,
        status: order.status,
        products: order.products,
    });

    useEffect(() => {
        setRows(filteredOrders.map(createData));
    }, [filteredOrders]);

    function handleStatus(status) {
        setActiveStatus(status.id);
        if (status.id === 0) {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((o) => o.status === status.value));
        }
    }

    return (
        <>
            <Filter>
                {orderStatusOptions.map((status) => (
                    <FilterOption
                        key={status.id}
                        onClick={() => handleStatus(status)}
                        $isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                    </FilterOption>
                ))}
            </Filter>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.orderId}
                                row={row}
                                orders={orders}
                                setOrders={setOrders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}