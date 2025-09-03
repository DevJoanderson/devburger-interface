import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { ProductImage, SelectStatus } from './styles';
import { orderStatusOptions } from './oderStatus';

export function Row({ row, orders, setOrders }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const selectedOption = useMemo(
        () => orderStatusOptions.find((o) => o.value === row.status) ?? null,
        [row.status]
    );

    async function newStatusOrder(id, status) {
        try {
            setLoading(true);


            const { data: updated } = await api.put(`/orders/${id}`, { status });
            const newOrders = orders.map(order => order._id == id ? { ...order, status } : order,)
            setOrders(newOrders);
            setOrders((prev) =>
                prev.map((o) => (o._id === updated._id ? updated : o))
            );
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>


                <TableCell>{row.orderId}</TableCell>


                <TableCell>{row.name}</TableCell>


                <TableCell>{formatDate(row.date)}</TableCell>


                <TableCell>
                    <SelectStatus
                        options={orderStatusOptions.filter((s) => s.id !== 0)}
                        placeholder="Status"
                        value={selectedOption}
                        onChange={(opt) => newStatusOrder(row.orderId, opt.value)}
                        isLoading={loading}
                        isDisabled={loading}
                        menuPortalTarget={document.body}
                    />
                </TableCell>
            </TableRow>


            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Itens do pedido
                            </Typography>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Imagem</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products?.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.category ?? '—'}</TableCell>
                                            <TableCell>
                                                <ProductImage src={product.url} alt={product.name} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    orders: PropTypes.array.isRequired,
    setOrders: PropTypes.func.isRequired,
    row: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
        ]).isRequired,
        status: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                category: PropTypes.string,
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
                url: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};
