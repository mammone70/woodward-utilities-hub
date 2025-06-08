import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function StatsCardsSkeletons() {
  return (
    <>
        <Skeleton className=" bg-gray-400 h-8 w-24 mb-2 rounded-md" />
        <Skeleton className=" bg-gray-400 h-4 w-32 rounded-md" />
    </>
  )
}
