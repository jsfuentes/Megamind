import { useRouter } from 'next/router'
import decks from '../../decks.json'

export default () => {
  const router = useRouter()

  const deck = decks[router.query.id]
  if (!deck) return <p></p>

  return (
    <>
      <h1>{deck.title}</h1>
      <p>{deck.card_ids}</p>
    </>
  )
}