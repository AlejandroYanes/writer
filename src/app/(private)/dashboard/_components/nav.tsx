'use client'

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

import { buttonVariants, cn } from '@/ui';

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'default' | 'ghost';
  }[];
}

export function Nav({ links }: NavProps) {
  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {links.map((link, index) =>
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: link.variant, size: 'sm' }),
              link.variant === 'default' &&
              'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start'
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.variant === 'default' &&
                  'text-background dark:text-white'
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        )}
      </nav>
    </div>
  )
}
