import { useEffect, useState } from "react";

import ParkingAreaTable from "../components/ParkingAreaTable";
import ParkingAreaFormModal from "../components/ParkingAreaFormModal";

import { createParkingArea, deleteParkingArea, editParkingArea, getParkingAreas } from "../services/parkingAreaService";

import ParkingArea from "../types/ParkingArea";
import ModalAction from "../types/ModalActions";
import ModalActions from "../types/ModalActions";
import ConfirmModal from "../components/ConfirmModal";

const ManagementPage = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
    const [formModalAction, setFormModalAction] = useState<ModalAction>(ModalAction.ADD);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [confirmModalTitle, setConfirmModalTitle] = useState<string>("");
    const [confirmModalDescription, setConfirmModalDescription] = useState<string>("");

    const [selectedArea, setSelectedArea] = useState<ParkingArea | null>(null);
    const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);

    const refreshParkingAreas = async () => {
        getParkingAreas().then((response) => {
            setParkingAreas(response.data);
        });
    };

    useEffect(() => {
        refreshParkingAreas();
    }, []);

    const openFormModal = (action: ModalActions) => {
        setFormModalAction(action);
        setIsFormModalOpen(true);
    };

    const openConfirmModal = () => {
        setConfirmModalTitle("Deleting parking area");
        setConfirmModalDescription(
            `Are you sure you want to delete selected parking area? (<b>${selectedArea?.name}</b>)`
        );
        setIsConfirmModalOpen(true);
    };

    const handleSubmit = (data: ParkingArea) => {
        if (formModalAction === ModalAction.ADD)
            createParkingArea(data).then(() => {
                setIsFormModalOpen(false);
                refreshParkingAreas();
            });
        else
            editParkingArea(data).then(() => {
                setIsFormModalOpen(false);
                refreshParkingAreas();
            });
    };

    const handleDelete = () => {
        if (selectedArea?.id)
            deleteParkingArea(selectedArea.id).then(() => {
                setIsConfirmModalOpen(false);
                refreshParkingAreas();
            });
    };

    return (
        <>
            <ParkingAreaTable
                areas={parkingAreas}
                selectedArea={selectedArea}
                onAreaSelection={setSelectedArea}
                onAddButtonClick={() => openFormModal(ModalAction.ADD)}
                onEditButtonClick={() => openFormModal(ModalAction.EDIT)}
                onDeleteButtonClick={() => openConfirmModal()}
            />

            <ParkingAreaFormModal
                isOpen={isFormModalOpen}
                action={formModalAction}
                parkingArea={selectedArea}
                onClose={() => setIsFormModalOpen(!isFormModalOpen)}
                onSubmit={(data) => handleSubmit(data)}
            />

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                title={confirmModalTitle}
                description={confirmModalDescription}
                onClose={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default ManagementPage;
