import { Star, StarOutline } from '@/assets'

type Props = {
  rating: number
}

export const Rating = ({ rating }: Props) => {
  const maxRating = 5
  const currentRating = new Array(maxRating).fill(null)

  return (
    <div style={{ color: 'yellow' }}>
      {currentRating.map((_, i) => {
        if (rating > i) {
          return <Star fill={'yellow'} key={i} />
        } else {
          return <StarOutline fill={'red'} key={i} />
        }
      })}
    </div>
  )
}
