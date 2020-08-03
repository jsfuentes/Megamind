import { useRouter } from 'next/router'
import decks from '../../decks.json'
import Flashcardlist from '../../components/Flashcardlist'

export default () => {
  const router = useRouter()

  const deck = decks[router.query.id]
  if (!deck) return <p></p>

  return (
    <>
      <h1>{deck.title}</h1>
      <Flashcardlist deck={deck}></Flashcardlist>
    </>
  )
}