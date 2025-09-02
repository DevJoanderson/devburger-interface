import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
import { formatDate } from '../../../utils/formatDate';

export function Row({ row }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell width={48}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>


                <TableCell>{row.orderId}</TableCell>


                <TableCell>{row.name}</TableCell>


                <TableCell>{formatDate(row.date)}</TableCell>


                <TableCell>{row.status}</TableCell>
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
                                                <img
                                                    src={product.url}
                                                    alt={product.name}
                                                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }}
                                                />
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
