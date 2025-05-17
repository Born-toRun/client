'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variants = 'primary' | 'danger' | 'secondary' | 'text';
type Tone = 'green' | 'red' | 'gray';
type Size = 'lg' | 'md' | 'sm';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variants: Variants;
  size: Size;
  loading?: boolean;
  tone: Tone;
}

export default function Button({
  text,
  size,
  loading,
  variants,
  tone,
  ...rest
}: Props) {
  const styleMap: Record<Variants, Record<Tone, string>> = {
    primary: {
      green:
        'bg-primary-G400 text-white hover:bg-primary-300 active:bg-primary-500 disabled:bg-secondary-40 disabled:text-white border-0',
      gray: '',
      red: '',
    },
    danger: {
      red: 'border-0 text-white bg-system-r-400 hover:bg-system-r-300 active:bg-system-r-500 disabled:bg-secondary-40',
      green: '',
      gray: '',
    },
    secondary: {
      green:
        'border-[1px] bg-transparent text-primary-400 border-primary-400  hover:text-primary-300 hover:bg-primary-300 hover:border-primary-300 active:text-primary-500 active:border-primary-500 active:bg-secondary-30 disabled:border-secondary-40 disabled:text-secondary-40',
      gray: 'bg-transparent border border-secondary-40 text-black hover:bg-secondary-10 hover:border-secondary-60 active:bg-secondary-30 active:border-secondary-90 disabled:border-secondary-40 disabled:text-secondary-40',
      red: 'bg-transparent border border-system-r-400 text-system-r-400  hover:border-system-r-300 hover:text-system-r-300 active:bg-secondary-30 active:border-system-r-500 active:text-system-r-500 disabled:border-secondary-40 disabled:text-secondary-40',
    },
    text: {
      green:
        'bg-transparent border-0 text-primary-400 hover:bg-secondary-10 hover:text-primary-400 active:bg-secondary-30 active:text-primary-500 disabled:text-secondary-40',
      gray: 'bg-transparent border-0 text-black hover:bg-secondary-10 active-bg-secondary-30 disabled:text-secondary-40',
      red: 'bg-transparent border-0 text-system-r-400 hover:bg-secondary-10 hover:text-system-r-300 active:bg-secondary-30 active:text-system-r-500 disabled:text-secondary-40',
    },
  };

  const loadingMap: Record<Variants, Record<Tone, string>> = {
    primary: {
      green: 'bg-primary-G400 text-white',
      red: '',
      gray: '',
    },
    danger: {
      red: 'bg-system-r-R400 text-white',
      green: '',
      gray: '',
    },
    secondary: {
      green: 'border-primary-400 text-primary-400',
      red: 'border-system-r-R400 text-system-r-R400',
      gray: 'border-secondary-N40 text-secondary-N40',
    },
    text: {
      green: 'text-primary-G400',
      red: 'text-system-r-R400',
      gray: 'text-secondary-N40',
    },
  };

  const sizeMap: Record<Size, string> = {
    lg: 'py-[17px] label-lg',
    md: 'py-[14px] label-md',
    sm: 'py-[11.5px] label-sm',
  };

  return (
    <button
      disabled={loading || rest.disabled}
      className={clsx(
        loading ? loadingMap[variants][tone] : styleMap[variants][tone],
        sizeMap[size],
        'h-[56px] round-xs w-full flex items-center justify-center'
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
