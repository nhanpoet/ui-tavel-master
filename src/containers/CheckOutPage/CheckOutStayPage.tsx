import { Tab } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import StayDatesRangeInput from "components/HeroSearchForm/StayDatesRangeInput";
import useWindowSize from "hooks/useWindowResize";

export interface CheckOutPageProps {
  className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
  const [selectedDate, setSelectedDate]: any = useState({
    startDate: moment(),
    endDate: moment().add(4, "days"),
  });

  const windowSize = useWindowSize();

  // eslint-disable-next-line no-restricted-globals
  const id = location.pathname.split("/")[4];

  const [listingData, setListingData]: any = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/room/${id}`).then((response) => {
      setListingData(response.data);
    });
  }, []);

  const auth = Cookies.get("auth");

  console.log(selectedDate.startDate.format("DD MM YY"));

  const [data]: any = useState({
    userId: auth,
    roomId: id,
    startD: selectedDate.startDate.format("DD MM YY"),
    endD: selectedDate.endDate.format("DD MM YY"),
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/user-booking`, data);
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={listingData.roomImage} />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {listingData.roomType}
              </span>
              <span className="text-base font-medium mt-1 block">
                {listingData.roomNumber}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {listingData.roomBed} beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>${listingData.roomPrice} x 3 day</span>
            <span>${listingData.roomPrice * 3}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${listingData.roomPrice * 3}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            Confirm and payment
          </h2>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div>
            <div>
              <h3 className="text-2xl font-semibold">Your trip</h3>
              <NcModal
                renderTrigger={(openModal) => (
                  <span
                    onClick={() => openModal()}
                    className="block lg:hidden underline  mt-1 cursor-pointer"
                  >
                    View booking details
                  </span>
                )}
                renderContent={renderSidebar}
              />
            </div>
            <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
              <div className="flex-1 p-5 flex justify-between space-x-2">
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-400">Date</span>
                  <StayDatesRangeInput
                    wrapClassName="divide-x divide-neutral-200 dark:divide-neutral-700"
                    onChange={(date) => setSelectedDate(date)}
                    numberOfMonths={1}
                    fieldClassName="p-5"
                    defaultValue={selectedDate}
                    anchorDirection={windowSize.width > 1400 ? "left" : "right"}
                  />
                  <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                  <span className="mt-1.5 text-lg font-semibold">
                    {/* {selectedDate.startDate.format("MMM DD")} -{" "}
                    {selectedDate.endDate.format("MMM DD")}, 2022 */}
                  </span>
                </div>
                <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
              </div>
              <div className="flex-1 p-5 flex justify-between space-x-5">
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-400">Guests</span>
                  <span className="mt-1.5 text-lg font-semibold">3 Guests</span>
                </div>
                <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Pay with</h3>
            <div className="mt-6">
              <Tab.Group>
                <Tab.List className="flex">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full flex items-center justify-center focus:outline-none ${
                          selected
                            ? "bg-neutral-800 text-white"
                            : "text-neutral-6000 dark:text-neutral-400"
                        }`}
                      >
                        Credit card
                        <img className="w-8" src={visaPng} alt="" />
                        <img className="w-8" src={mastercardPng} alt="" />
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                          selected
                            ? "bg-neutral-800 text-white"
                            : " text-neutral-6000 dark:text-neutral-400"
                        }`}
                      >
                        <span className="mr-2.5">Paypal</span>
                      </button>
                    )}
                  </Tab>
                </Tab.List>

                <div className="w-14 border-b border-neutral-200 my-5"></div>
                <Tab.Panels>
                  <Tab.Panel className="space-y-5">
                    <div className="space-y-1">
                      <Label>Card number </Label>
                      <Input defaultValue="111 112 222 999" />
                    </div>
                    <div className="space-y-1">
                      <Label>Card holder </Label>
                      <Input defaultValue="JOHN DOE" />
                    </div>
                    <div className="flex space-x-5  ">
                      <div className="flex-1 space-y-1">
                        <Label>Expiration date </Label>
                        <Input type="date" defaultValue="MM/YY" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label>CVC </Label>
                        <Input />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Messager for author </Label>
                      <Textarea placeholder="..." />
                      <span className="text-sm text-neutral-500 block">
                        Write a few sentences about yourself.
                      </span>
                    </div>
                    <div className="pt-4">
                      <ButtonPrimary>Confirm and pay</ButtonPrimary>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="space-y-5">
                    <div className="space-y-1">
                      <Label>Email </Label>
                      <Input type="email" defaultValue="example@gmail.com" />
                    </div>
                    <div className="space-y-1">
                      <Label>Password </Label>
                      <Input type="password" defaultValue="***" />
                    </div>
                    <div className="space-y-1">
                      <Label>Messager for author </Label>
                      <Textarea placeholder="..." />
                      <span className="text-sm text-neutral-500 block">
                        Write a few sentences about yourself.
                      </span>
                    </div>
                    <div className="pt-4">
                      <ButtonPrimary type="submit">
                        Confirm and pay
                      </ButtonPrimary>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
