import React from 'react'
import Link from 'next/link'
import SkewedInfiniteScroll from './skewedInfinitScroll'
import { HoverTadaButton } from './hoverTada'
import Card from './card'

const data = [
  {
    id: 1,
    title: 'Skewed Infinite Scroll',
    link: '/animations/skewed-infinite-scroll',
    component: <SkewedInfiniteScroll />,
  },
  {
    id: 2,
    title: 'Hover Animations',
    link: '/animations/hovers',
    component: <HoverTadaButton />,
  },
]

const AnimationCards = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <Link href={item.link} key={item.id}>
            <Card title={item.title}>{item.component}</Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AnimationCards