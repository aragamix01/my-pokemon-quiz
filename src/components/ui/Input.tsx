import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    const input = <input ref={ref} id={id} className={cn('input', className)} {...props} />
    if (!label) return input
    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        {input}
      </div>
    )
  }
)

Input.displayName = 'Input'
