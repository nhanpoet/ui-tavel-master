import { PencilAltIcon } from "@heroicons/react/outline";
import axios from "axios";
import StayDatesRangeInput from "components/HeroSearchForm/StayDatesRangeInput";
import StartRating from "components/StartRating/StartRating";
import useWindowSize from "hooks/useWindowResize";
import Cookies from "js-cookie";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useHistory } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import NcModal from "shared/NcModal/NcModal";
import swal from "sweetalert";

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

  const history = useHistory();

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
            <PayPalButton
              amount="0.01"
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details: any, data: any) => {
                swal("Oops", "Booking Success", "success");
                history.push(`/pay-done/`);

                // OPTIONAL: Call your server to save the transaction
                return fetch("http://localhost:8080/api/user-booking", {
                  method: "post",
                  body: JSON.stringify({
                    BookingCode: data.orderID,
                    userId: auth,
                    roomId: id,
                    startD: selectedDate.startDate.format("DD MM YY"),
                    endD: selectedDate.endDate.format("DD MM YY"),
                  }),
                });
              }}
            />
          </div>
        </div>
      </div>
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
