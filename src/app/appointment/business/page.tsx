import React from "react";

import FindBusinessPage from "@/components/appointment/business/FindBusiness";
import { BusinessSearchHero } from "@/components/appointment/business/BusinessSearchHero";

// senin JSON verin
const AppointmentBusinessPage = () => {
  return (
    <div className="">
      <BusinessSearchHero />
      <div className=" mx-auto px-4  mt-10 max-w-7xl">
        <FindBusinessPage />
      </div>
    </div>
  );
};
export default AppointmentBusinessPage;
