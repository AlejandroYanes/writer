'use client'

import { type ReactNode } from 'react';
import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

import { Button, buttonVariants, cn } from '@/ui';

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
  onClick?: () => void;
}

export function NavLink(props: NavLinkProps) {
  const { title, count, variant, icon: Icon, onClick } = props;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size="sm"
      className={cn(
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
    </Button>
  );
}
