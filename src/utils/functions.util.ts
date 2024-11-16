
export function toggleModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;
  
    const modalIsOpen = modal?.open;
  
    if (modal) {
      if (modalIsOpen) {
        modal.close();
      } else {
        modal.showModal();
      }
    }
  }
  