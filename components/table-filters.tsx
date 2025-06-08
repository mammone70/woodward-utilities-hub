import { CalendarIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TBillType } from "@/schemas/bill-types-schemas"
import { DateRange } from "react-day-picker"
import { enUS } from "date-fns/locale"

interface TableFiltersProps {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  billTypes?: TBillType[]
  selectedBillType?: string
  onBillTypeChange?: (type: string) => void
  showBillTypeFilter?: boolean
}

export function TableFilters({
  dateRange,
  onDateRangeChange,
  searchQuery,
  onSearchChange,
  billTypes,
  selectedBillType,
  onBillTypeChange,
  showBillTypeFilter = false,
}: TableFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-full overflow-hidden bg-gray-50 b"
            align="start"
            
          >
            <Calendar
              className="bg-gray-50"
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange as DateRange}
              onSelect={(range: DateRange | undefined) => {
                if (range) {
                  onDateRangeChange({
                    from: range.from,
                    to: range.to
                  })
                } else {
                  onDateRangeChange({
                    from: undefined,
                    to: undefined
                  })
                }
              }}
              numberOfMonths={2}
              locale={enUS}
              showOutsideDays
              fixedWeeks
            />
          </PopoverContent>
        </Popover>
        {showBillTypeFilter && billTypes && onBillTypeChange && (
          <Select value={selectedBillType} onValueChange={onBillTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select bill type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {billTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  )
} 