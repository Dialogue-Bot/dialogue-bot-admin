import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as UCard,
} from '@/components/ui'
import { TCardInput } from '@/lib/schema/card-input'

type Props = {
  card: TCardInput
}

const Card = ({ card }: Props) => {
  return (
    <UCard className='overflow-hidden min-h-60 flex flex-col max-w-72 w-full flex-shrink-0'>
      <CardContent className='p-0 flex-1 flex items-center bg-primary'>
        {card.imageUrl && (
          <img
            src={card.imageUrl}
            alt='Card Image'
            className='object-cover flex-1 h-full w-full'
          />
        )}
      </CardContent>
      <CardHeader className='p-4 mt-auto'>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.subtitle}</CardDescription>
      </CardHeader>
    </UCard>
  )
}

export default Card
