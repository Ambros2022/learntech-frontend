'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Autocomplete from 'src/@core/components/mui/autocomplete'
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

interface SearchResult {
  id: number
  name: string
  slug: string
}

export default function ScholarshipSearch() {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSearch = async (value: string) => {
    if (value.length < 2) {
      setSearchResults([])
      setOpen(false)
      return
    }

    try {
      setLoading(true)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI || ''}/api/website/scholarships/get?searchfrom=name&searchtext=${encodeURIComponent(value)}`,
        { signal: abortControllerRef.current.signal }
      )
      if (!response.ok) return
      const json = await response.json()

      const suggestions = (json?.data ?? []).map((item: { id: number; name: string; slug: string }) => ({
        name: item.name,
        slug: item.slug,
        id: item.id,
      }))

      setSearchResults(suggestions)
      setOpen(true)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching data:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (event: any, value: string) => {
    handleSearch(value)
  }

  const handleClearInput = (params: any) => {
    setSearchResults([])
    setOpen(false)
    if (params.inputProps.onChange) {
      const event = {
        target: {
          value: '',
        },
      } as React.ChangeEvent<HTMLInputElement>
      params.inputProps.onChange(event)
    }
  }

  return (
    <Autocomplete
      open={open}
      onClose={() => setOpen(false)}
      onInputChange={handleInputChange}
      options={searchResults}
      getOptionLabel={(option: SearchResult) => option.name}
      renderOption={(props, option: SearchResult) => (
        <li {...props} key={option.id}>
          <Link
            href={`/scholarship/${option.id}/${option.slug}`}
            style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
          >
            {option.name}
          </Link>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for Scholarship"
          className="form-control"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.inputProps.value ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClearInput(params)}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}
