'use client';

import { useGetFeesListQuery } from './hooks/queries';

export default function FeedContainer() {
  const { data } = useGetFeesListQuery({ isMyCrew: false });
  console.log(data);
  return <div></div>;
}
