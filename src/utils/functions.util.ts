import axios, { AxiosError } from "axios";
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

export async function downloadFile({ url }: { url: string }): Promise<File> {
  try {
    //  const token = localStorage.getItem("access");
    const response = await axios.get<Blob>(url, {
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    const fileName = `${new Date().toISOString()}.png`;
    const mimeType = `image/png`;

    return new File([response.data], fileName, {
      // mimeType
      type: response.data.type,
    });
  } catch (error) {
    throw new Error(`Failed to fetch the file: ${error}`);
  }
}

export async function downloadFile2({
  url,
  filename,
}: {
  url: string;
  filename?: string;
}): Promise<File> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const flName = filename || url.split("/").pop() || "download";

    return new File([blob], flName, { type: `image/png` });
  } catch (error) {
    throw new Error(
      `Failed to download file: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

// Usage:
// await downloadFile('https://example.com/file.pdf', 'myfile.pdf');

export function delay({
  milliseconds,
}: {
  milliseconds: number;
}): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function transactionStatus(status: string): string {
  switch (status) {
    case "pending":
      return "En attente";
    case "accept":
      return "Accepté";
    case "cancel":
      return "Annulé";
    default:
      return "En attente";
  }
}

export function transactionType(type: string): string {
  switch (type) {
    case "deposit":
      return "Dépôt";
    case "withdrawal":
      return "Retrait";
    case "subscrib":
      return "Abonnement";
    case "reward":
      return "Récompense";
    case "disbursements":
      return "Remboursement Momo";
    default:
      return "Inconnu";
  }
}

export function transactionMobileReference(mobileReference: string): string {
  switch (mobileReference) {
    case "moov":
      return "Moov";
    case "mtn":
      return "MTN";
    case "card":
      return "Carte";
    default:
      return "Inconnu";
  }
}

export function ensureBaseUrl(url: string): string {
  const baseUrl = "https://api.coobet.app";
  if (!url.startsWith(baseUrl)) {
    const normalizedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
    return `${normalizedBaseUrl}${normalizedUrl}`;
  }
  return url;
}

export function extractAxiosError(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data;

    if (typeof data === "object" && data !== null) {
      if ("message" in data && typeof data.message === "string") {
        return data.message;
      }

      const errorMessages: string[] = [];
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          errorMessages.push(`${value.join("  ")}`);
        } else if (typeof value === "string") {
          errorMessages.push(`${value}`);
        }
      });

      return errorMessages.length > 0
        ? errorMessages.join(" . ")
        : "Une erreur inconnue s'est produite";
    }
  }

  return error.message || "Une erreur inconnue s'est produite";
}
