import axios from "axios";
import Heading2 from "components/Heading/Heading2";
import StayCard from "components/StayCard/StayCard";
import { StayDataType } from "data/types";
import { FC, useEffect, useState } from "react";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = [],
}) => {
  const [listingData, setListingData] = useState<StayDataType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/hotels").then((response) => {
      setListingData(response.data);
    });
  }, []);
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listingData.map((stay) => (
          <StayCard key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};
export default SectionGridFilterCard;
