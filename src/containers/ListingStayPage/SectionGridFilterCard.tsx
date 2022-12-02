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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    axios.get("http://localhost:8080/api/hotel").then((response) => {
      setListingData(response.data);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const DEMO_DATA = listingData.slice(indexOfFirstPost, indexOfLastPost);

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
        {DEMO_DATA.map((stay: any) => (
          <StayCard key={stay.hsId} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination
          totalPosts={listingData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default SectionGridFilterCard;
