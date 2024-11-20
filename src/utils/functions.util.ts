import api from "./api.util";

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

export async function createFile({ url }: { url: string }): Promise<File> {
  try {
    const response = await api.get<Blob>(url, { responseType: "blob" });

    const fileName = `${new Date().toISOString()}.png`;
    const mimeType = `image/png`;

    return new File([response], fileName, { type: mimeType });
  } catch (error) {
    throw new Error(`Failed to fetch the file: ${error}`);
  }
}

export function delay({
  milliseconds,
}: {
  milliseconds: number;
}): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
