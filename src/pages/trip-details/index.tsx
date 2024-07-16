import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import CreateActivityModal from "./create-activity-modal";
import ImportantLinks from "./important-links";
import Guests from "./guests";
import Activities from "./activities";
import DestinationAndDateHeader from "./destination-and-date-header";
import Button from "../../components/button";
import UpdateTripModal from "./update-trip-modal";
import { DateRange } from "react-day-picker";
import CreateLinkModal from "./create-link-modal";
import UpdateGuestsModal from "./update-guests-modal ";
import NewInvitesModal from "./new-invites-modal";
import EditGuestModal from "./edit-guest-modal";

const TripDetailsPage = () => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isUpdateGuestsModalOpen, setIsUpdateGuestsModalOpen] = useState(false);
  const [isNewInvitesModalOpen, setIsNewInvitesModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isEditGuestModalOpen, setIsEditGuestModalOpen] = useState(false);
  const [participantId, setParticipantId] = useState('');

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true);
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false);
  }

  function openUpdateGuestsModal() {
    setIsUpdateGuestsModalOpen(true);
  }

  function closeUpdateGuestsModal() {
    setIsUpdateGuestsModalOpen(false);
  }

  function openNewInvitesModal() {
    setIsNewInvitesModalOpen(true);
  }

  function closeNewInvitesModal() {
    setIsNewInvitesModalOpen(false);
  }

  function openEditGuestModal() {
    setIsEditGuestModalOpen(true);
  }

  function closeEditGuestModal() {
    setIsEditGuestModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = new FormData(event.currentTarget).get('email')?.toString();

    if (!email) {
      return
    } 

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);
    
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader openUpdateTripModal={openUpdateTripModal}></DestinationAndDateHeader>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button variant="primary" onClick={openCreateActivityModal}><Plus className="size-5"></Plus>Cadastrar atividade
            </Button>
          </div>

          <Activities></Activities>
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal}></ImportantLinks>
          <div className="w-full h-px bg-zinc-800"></div>
          <Guests openUpdateGuestsModal={openUpdateGuestsModal}></Guests>
        </div>
      </main>

      {isCreateActivityModalOpen && <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal}></CreateActivityModal>}

      {isCreateLinkModalOpen && <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal}></CreateLinkModal>}

      {isUpdateTripModalOpen && <UpdateTripModal closeUpdateTripModal={closeUpdateTripModal} setEventStartAndEndDates={setEventStartAndEndDates} eventStartAndEndDates={eventStartAndEndDates}></UpdateTripModal>}

      {isUpdateGuestsModalOpen && <UpdateGuestsModal closeUpdateGuestsModal={closeUpdateGuestsModal} openNewInvitesModal={openNewInvitesModal} openEditGuestModal={openEditGuestModal} setParticipantId={setParticipantId}></UpdateGuestsModal>}

      {isNewInvitesModalOpen && <NewInvitesModal closeNewInvitesModal={closeNewInvitesModal} emailsToInvite={emailsToInvite} removeEmailFromInvites={removeEmailFromInvites} addNewEmailToInvite={addNewEmailToInvite}></NewInvitesModal>}

      {isEditGuestModalOpen && <EditGuestModal closeEditGuestModal={closeEditGuestModal} participantId={participantId}></EditGuestModal>}
      
    </div>
  )
};

export default TripDetailsPage;
