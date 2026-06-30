import { cn } from '@/lib/utils'

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full text-sm', className)}>{children}</table>
    </div>
  )
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b">{children}</thead>
}

export function TH({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={cn('h-11 px-4 text-left align-middle font-medium text-muted-foreground', className)}>{children}</th>
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
}

export function TR({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return <tr className={cn('border-b transition-colors hover:bg-muted/50', onClick && 'cursor-pointer', className)} onClick={onClick}>{children}</tr>
}

export function TD({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn('p-4 align-middle', className)}>{children}</td>
}
