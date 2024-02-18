import { Star, StarOutline } from '@/assets'

type Props = {
  maxRating?: number
  rating: number
}

export const Rating = ({ maxRating = 5, rating }: Props) => {
  const elementsCount = Array(maxRating).fill(null)

  return (
    <div style={{ color: 'yellow' }}>
      {elementsCount.map((_, i) => {
        if (rating > i) {
          return <Star key={i} />
        } else {
          return <StarOutline key={i} />
        }
      })}
    </div>
  )
}
