import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card', className)} {...props} />
}

export function CardKicker({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card-kicker', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('card-title', className)} {...props} />
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('card-body', className)} {...props} />
}

export function CardMeta({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card-meta', className)} {...props} />
}
