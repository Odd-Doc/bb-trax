import { useEffect, useState } from "react";
export default function useFacilityComplianceGrade({ data }) {
  const getPercent = () => {
    const factor =
      deviceCompliance.current /
      (deviceCompliance.overdue + deviceCompliance.current);
    const percent = factor * 100;

    return parseInt(percent);
  };
  const deviceCompliance = {
    current: data.current,
    overdue: data.overdue,
  };

  return getPercent();
}
