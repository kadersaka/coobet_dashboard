import { useState } from "react";
import Modal from "./Modal";
import {
  downloadFile,
  downloadFile2,
  toggleModal,
} from "@/utils/functions.util";
import SelectAddItems, { ItemsResponse } from "./SelectAddItems";
import Club from "@/models/club.model";
import Championship from "@/models/championship.model";
import Datetime from "react-datetime";

interface ItemSelectorProps {
  itemName: string;
  placeholder: string;
  modalId: string;
  onModalClose: () => void;
  item: any;
  onItemSelected: (item: any) => void;
  defautItem: any;
  getItemsfn: (
    searchField?: string,
    page?: number,
    pageSize?: number,
  ) => Promise<any>;
  addItemfn: (item: any) => Promise<any>;
  error?: boolean;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  itemName,
  placeholder,
  modalId,
  onModalClose,
  item,
  defautItem,
  onItemSelected,
  getItemsfn,
  addItemfn,
  error,
}) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(item);
  const [currentItemPage, setCurrentItemPage] = useState(1);
  const [dynamicKey, setDynamicKey] = useState(new Date().toISOString());

  const handleOpenModal = () => toggleModal(modalId);

  const handleCloseModal = () => {
    onModalClose();
    setCurrentItemPage(1);
  };

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    onItemSelected(item);
    toggleModal(modalId);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col ">
      <label className="block font-medium text-black dark:text-white">
        {itemName}
      </label>

      <div
        onClick={handleOpenModal}
        className="w-full rounded-sm border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        {selectedItem?.name || placeholder}
      </div>

      {error && (
        <span className="text-xs text-red-500">Please select a Item</span>
      )}

      <Modal
        id={modalId}
        onClose={() => {
          handleCloseModal();
          setDynamicKey(new Date().toISOString());
        }}
      >
        <SelectAddItems
          key={dynamicKey}
          title={itemName}
          getItemsfn={async (value: string) => {
            try {
              const response = await getItemsfn(value, 1);
              setCurrentItemPage(1);

              return {
                items: response?.results || [],
                canLoadMore: !!response?.next,
              };
            } catch (error) {
              console.error("Error fetching Item:", error);
              return {
                items: [],
                canLoadMore: false,
              };
            }
          }}
          loadMoreItemsfn={async (value: string) => {
            try {
              setCurrentItemPage((prev) => prev + 1);
              const response = await getItemsfn(value, currentItemPage);
              return {
                items: response?.results || [],
                canLoadMore: !!response?.next,
              };
            } catch (error) {
              console.error("Error loading more Item:", error);
              return {
                items: [],
                canLoadMore: false,
              };
            }
          }}
          addItemfn={async (value: string) => {
            try {
              if (defautItem instanceof Club) {
                const file = await downloadFile2({
                  url: "/images/cover/cover-01.png",
                  filename: "defaultImage",
                });

                defautItem.name = value;
                defautItem.logo = file;
              } else if (defautItem instanceof Championship) {
                defautItem.name = value;
                defautItem.sport = "Football";
              }
              return await addItemfn(defautItem);
            } catch (error) {
              console.error("Error creating Item:", error);
              return null;
            }
          }}
          onItemSelected={(item: any) => {
            handleItemSelect(item);
            setDynamicKey(new Date().toISOString());
          }}
        />
      </Modal>
    </div>
  );
};

export default ItemSelector;
