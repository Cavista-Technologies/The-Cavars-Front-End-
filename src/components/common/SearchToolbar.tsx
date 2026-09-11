import { Button, Input, InputGroup } from "@chakra-ui/react"
import { LuPlus, LuSearch } from "react-icons/lu"

interface SearchToolbarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  addLabel?: string
  onAdd?: () => void
}

export function SearchToolbar({ placeholder, value, onChange, onSubmit, addLabel, onAdd }: SearchToolbarProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
      style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", width: "100%" }}
    >
      <InputGroup maxW="sm" startElement={<LuSearch />}>
        <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </InputGroup>
      {onAdd && (
        <Button type="button" colorPalette="orange" onClick={onAdd}>
          <LuPlus /> {addLabel}
        </Button>
      )}
    </form>
  )
}
