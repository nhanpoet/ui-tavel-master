import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonClose from "shared/ButtonClose/ButtonClose";

const Reserve = ({ setOpen, hsId }: any) => {
  const [listingData, setListingData]: any = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/hotel/${hsId}`).then((response) => {
      setListingData(response.data);
    });
  }, []);

  const [roomlistingData, setRoomListingData]: any = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/room/").then((response) => {
      setRoomListingData(response.data);
    });
  }, []);

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(true);

  const [selectedRooms, setSelectedRooms] = useState<any[]>([]);

  //
  const closeModalMoreFilter = () => setOpen(false);

  const handleSelect = (e: any) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);

  return (
    <div>
      <Transition appear show={isOpenMoreFilter} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalMoreFilter}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              className="inline-block py-8 h-screen w-auto"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    More filters
                  </Dialog.Title>
                  <span className="absolute left-3 top-3">
                    <ButtonClose onClick={closeModalMoreFilter} />
                  </span>
                </div>
                <div className="flex-grow overflow-y-auto">
                  <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                    {roomlistingData.map((item: any) => (
                      <div className="py-7" key={item.roomId}>
                        <h3 className="text-xl font-medium">
                          Room Type: {item.roomType}
                        </h3>
                        <div className="mt-6 relative ">
                          Room Des: {item.roomDescription}
                        </div>
                        <div className="mt-6 relative font-medium">
                          Max People: {item.roomGuestsnumber}
                        </div>
                        <div className="mt-6 relative font-medium">
                          Room Price: {item.roomPrice} $
                        </div>
                        <div className="mt-6 relative font-medium">
                          Room Number: {item.roomNumber}
                        </div>
                        <input
                          className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
                          type="checkbox"
                          value={item.roomId}
                          onChange={handleSelect}
                        ></input>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonPrimary
                    href={`/checkout/${selectedRooms}`}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Reserve Now!
                  </ButtonPrimary>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Reserve;
