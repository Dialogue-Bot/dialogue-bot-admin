import { CaretSortIcon } from '@radix-ui/react-icons';
import { memo, useCallback, useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { CheckIcon, X } from 'lucide-react';

export type TOption = {
   label: string;
   value: string;
};

type Props = {
   onChange?: (value: string[]) => void;
   options: TOption[];
   defaultValue?: string[];
   values?: string[];
   placeholder?: string;
};

export const MultipleSelect = memo(
   ({ onChange, options, defaultValue, placeholder, ...props }: Props) => {
      const [selected, setSelected] = useState<string[]>(defaultValue || []);

      const isControlled = useMemo(
         () => props.values !== undefined,
         [props.values]
      );

      const values = useMemo(
         () => (isControlled ? props.values : selected),
         [isControlled, selected, props.values]
      );

      const handleToggle = useCallback(
         (value: string) => {
            if (values === undefined) return;

            const index = values?.indexOf(value);

            const newSelected = [...values];

            if (index === -1) {
               newSelected.push(value);
            } else {
               newSelected.splice(index, 1);
            }

            if (!isControlled) {
               setSelected(newSelected);
            }
            onChange?.(newSelected);
         },
         [values, isControlled, onChange]
      );

      const isSelected = useCallback(
         (value: string) => {
            return values?.includes(value);
         },
         [values]
      );

      const selectedWithLabel = useMemo(
         () =>
            values?.map((item) => {
               return options.find((option) => option.value === item);
            }),
         [values, options]
      );

      return (
         <Popover>
            <PopoverTrigger asChild>
               <div className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none select-none gap-1">
                  {selectedWithLabel && selectedWithLabel.length ? (
                     selectedWithLabel?.map((item) => (
                        <Badge
                           key={item?.value}
                           className="flex items-center gap-1 p-1 py-0.5"
                        >
                           <span>{item?.label}</span>
                           <X
                              className="w-3 h-3"
                              onClick={() =>
                                 handleToggle(item?.value as string)
                              }
                           />
                        </Badge>
                     ))
                  ) : placeholder ? (
                     <span>{placeholder}</span>
                  ) : null}
                  <CaretSortIcon className="h-4 w-4 opacity-50 ml-auto" />
               </div>
            </PopoverTrigger>
            <PopoverContent
               style={{
                  width: 'var(--radix-popover-trigger-width)',
               }}
               className={cn('!p-1 select-none')}
            >
               {options.map((option) => {
                  return (
                     <div
                        className="relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50  justify-between"
                        onClick={() => handleToggle(option.value)}
                     >
                        {option.label}
                        {isSelected(option.value) ? (
                           <CheckIcon className="h-4 w-4" />
                        ) : null}
                     </div>
                  );
               })}
            </PopoverContent>
         </Popover>
      );
   }
);

MultipleSelect.displayName = 'MultipleSelect';

export default MultipleSelect;
