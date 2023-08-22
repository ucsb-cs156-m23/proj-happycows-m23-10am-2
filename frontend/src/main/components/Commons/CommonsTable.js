import React, { useState } from "react";
import OurTable, {ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/commonsUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CommonsTable({ commons, currentUser }) {
    const [show, setShow] = useState(false);
    const [cellToDelete, setCellToDelete] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/admin/editcommons/${cell.row.values["commons.id"]}`)
    }

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/commons/allplus"]
    );

    const deleteCallback = async (cell) => {
        setCellToDelete(cell);
        handleShow();
    }

    const leaderboardCallback = (cell) => {
        navigate(`/leaderboard/${cell.row.values["commons.id"]}`)
    }

    const columns = [
        {
            Header: 'id',
            accessor: 'commons.id', // accessor is the "key" in the data

        },
        {
            Header:'Name',
            accessor: 'commons.name',
        },
        {
            Header:'Cow Price',
            accessor: row => row.commons.cowPrice,
            id: 'commons.cowPrice'
        },
        {
            Header:'Milk Price',
            accessor: row => row.commons.milkPrice,
            id: 'commons.milkPrice'
        },
        {
            Header:'Starting Balance',
            accessor: row => row.commons.startingBalance,
            id: 'commons.startingBalance'
        },
        {
            Header:'Starting Date',
            accessor: row => String(row.commons.startingDate).slice(0,10),
            id: 'commons.startingDate'
        },
        {
            Header:'Degradation Rate',
            accessor: row => row.commons.degradationRate,
            id: 'commons.degradationRate'
        },
        {
            Header:'Show Leaderboard?',
            id: 'commons.showLeaderboard', // needed for tests
            accessor: (row, _rowIndex) => String(row.commons.showLeaderboard) // hack needed for boolean values to show up
        },
        {
            Header: 'Cows',
            accessor: 'totalCows'
        },
        {
            Header: 'Carrying Capacity',
            accessor: row => row.commons.carryingCapacity,
            id: 'commons.carryingCapacity'
        }
    ];

    const testid = "CommonsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid),
        ButtonColumn("Leaderboard", "secondary", leaderboardCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser,"ROLE_ADMIN") ? columnsIfAdmin : columns;

    const modalForm = (<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-testid="delete-modal"
    >
        <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete this commons?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        This is your last chance to keep this commons. If you choose to delete it, it will be gone forever.
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleClose} data-testid={`cancel-delete-button`}>
        Keep this Commons
        </Button>
        <Button variant="danger" onClick={() => { deleteMutation.mutate(cellToDelete); handleClose()}} data-testid={`confirm-delete-button`}>
        Permanently Delete
            </Button>
        </Modal.Footer>
  </Modal>);

    return (
    <>
        <OurTable
        data={commons}
        columns={columnsToDisplay}
        testid={testid}
        />
        {modalForm}
    </>);
};
