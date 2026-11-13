import { AvatarDemo } from '../components/demos/avatar'
import { ButtonDemo } from '../components/demos/button'
import { SpinnerDemo } from '../components/demos/spinner'

export default function Home() {
  return (
    <main className="flex max-w-full flex-col items-start gap-16">
      <AvatarDemo />

      <ButtonDemo />

      <SpinnerDemo />
    </main>
  )
}
