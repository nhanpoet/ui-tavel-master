import axios from "axios";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import Heading2 from "components/Heading/Heading2";
import { ExperiencesDataType } from "data/types";
import { FC, useEffect, useState } from "react";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: ExperiencesDataType[];
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = [],
}) => {
  const [listingData, setListingData] = useState<ExperiencesDataType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/experiences/").then((response) => {
      setListingData(response.data);
    });
  }, []);

  const DEMO_DATA = listingData.filter((_, i) => i < 4);
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading="Experiences in Tokyo"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            233 experiences
            <span className="mx-2">·</span>
            Aug 12 - 18
            <span className="mx-2">·</span>2 Guests
          </span>
        }
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {DEMO_DATA.map((stay: any) => (
          <ExperiencesCard key={stay.id} data={stay as any} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
