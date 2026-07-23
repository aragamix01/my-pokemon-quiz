import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, id, children, ...props }, ref) => {
    const select = (
      <select ref={ref} id={id} className={cn('input', className)} {...props}>
        {children}
      </select>
    )
    if (!label) return select
    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        {select}
      </div>
    )
  }
)

Select.displayName = 'Select'
