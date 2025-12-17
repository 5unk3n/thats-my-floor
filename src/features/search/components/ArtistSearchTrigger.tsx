'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';

import { SearchInput } from './SearchInput';

interface ArtistSearchTriggerProps {
  variant: 'dropdown' | 'button';
}

export function ArtistSearchTrigger({ variant }: ArtistSearchTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === 'dropdown' ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Search className="mr-2 h-4 w-4" />
            <span>검색해서 추가하기</span>
          </DropdownMenuItem>
        ) : (
          <Button variant="outline">아티스트 검색</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>아티스트 검색</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <SearchInput type="artist" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
