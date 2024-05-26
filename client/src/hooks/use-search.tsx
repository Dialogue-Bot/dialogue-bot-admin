import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { useDidUpdate } from './use-did-update'

export const useSearch = (field = 'q') => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get(field) || '')

  const [debounced] = useDebounceValue(query, 800)

  useDidUpdate(() => {
    if (debounced) {
      searchParams.set(field, debounced)
      setSearchParams(searchParams)
    } else {
      searchParams.delete(field)

      setSearchParams(searchParams)
    }
  }, [debounced, field, setSearchParams])

  const renderInput = useCallback(
    (opts?: { placeholder?: string; className?: string }) => {
      const placeholder = opts?.placeholder || ''
      return (
        <div className={cn('max-w-64 w-full', opts?.className)}>
          <Input
            className='w-full'
            defaultValue={searchParams.get(field) || query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            placeholder={placeholder}
          />
        </div>
      )
    },
    [query, searchParams, field],
  )

  return {
    query,
    setQuery,
    renderInput,
  }
}
