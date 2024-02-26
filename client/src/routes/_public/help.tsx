import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/help')({
  component: () => <div>Hello /_public/help!</div>
})