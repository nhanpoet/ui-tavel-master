import React, { FC, useEffect, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import { ExperiencesDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Avatar from "shared/Avatar/Avatar";
import axios from "axios";

export interface ExperiencesCardHProps {
  className?: string;
  data?: ExperiencesDataType;
}

const DEMO_DATA = DEMO_EXPERIENCES_LISTINGS[0];

const ExperiencesCardH: FC<ExperiencesCardHProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    ex_Imgs = [],
    exDescription,
    exName,
    // href,
    like,
    exSaleOff,
    isAds,
    exPrice,
    exReviewStar,
    exReviewCount,
    exId,
  }: any = data;

  const [listingData, setListingData]: any = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/enac/1").then((response) => {
      setListingData(response.data);
    });
  }, []);

  const urlImg = Array.prototype.map.call(ex_Imgs, function (item) {
    return item.urlImg;
  });

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full md:w-72 flex-shrink-0 overflow-hidden">
        <GallerySlider
          ratioClass="aspect-w-12 aspect-h-9 md:aspect-h-11"
          galleryImgs={urlImg as any}
        />
        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" />
        {exSaleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{exName}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
            <StartRating reviewCount={exReviewCount} point={exReviewStar} />
            <span>· </span>
            <div className="flex items-center">
              <span className="hidden sm:inline-block  text-base">
                <i className="las la-map-marked"></i>
              </span>
              <span className="sm:ml-2"> Tokyo, Japan </span>
            </div>
          </div>
        </div>
        {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        <div className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-400 mt-4">
          <span className="line-clamp-2">{exDescription}</span>
        </div>
        <div className="flex items-center space-x-8 mt-4  ">
          <div className="flex items-center space-x-2">
            <i className="las la-clock text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              3 hours
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Up to 6 people
            </span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-3 text-sm text-neutral-700  dark:text-neutral-300">
            <Avatar
              imgUrl={listingData.ecAvatar}
              userName={listingData.ecName}
            />
            <span className="hidden sm:inline-block">
              <span className="hidden sm:inline">Hosted by</span>{" "}
              {listingData.ecName}
            </span>
          </div>
          <span className="text-base font-semibold text-secondary-700">
            {exPrice}
            {` `}
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              $/person
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ExperiencesCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="ExperiencesCardH"
    >
      <Link
        to={`/listing-experiences-detail/${exId}`}
        className="md:flex md:flex-row"
      >
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default ExperiencesCardH;
