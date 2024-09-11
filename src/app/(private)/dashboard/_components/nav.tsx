'use client'

import { type ReactNode } from 'react';
import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

import { buttonVariants, cn } from '@/ui';

interface Props {
  children: ReactNode;
}

export function Nav({ children }: Props) {
  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {children}
      </nav>
    </div>
  );
}

interface NavLinkProps {
  title: string;
  count?: number;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
}

export function NavLink(props: NavLinkProps) {
  const { title, count, variant, icon: Icon } = props;

  return (
    <Link
      href="#"
      className={cn(
        buttonVariants({ variant: variant, size: 'sm' }),
        variant === 'default' &&
        'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        'justify-start'
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {title}
      {count && (
        <span
          className={cn(
            'ml-auto',
            variant === 'default' &&
            'text-background dark:text-white'
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
