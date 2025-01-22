'use client';

import { useMemo, useState } from 'react';
import { useTestData } from '@/hooks/useTestData';
import Select from '@/components/ui/Select';
import type { Option } from '@/components/ui/Select/types';

interface Item {
  Name: string;
  objectId: string;
}

export default function Home() {
  const { data, isFetching } = useTestData();

  const list = useMemo(() => {
    const results: Option[] = data.results.map((item: Item) => ({
      id: item.objectId,
      name: item.Name,
    }));
    return results;
  }, [data]);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className='p-6'>
      <Select items={list} onChange={handleChange} isDisabled={isFetching} />

      {selectedOption && (
        <div className='mt-6'>
          <pre>{JSON.stringify(selectedOption, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
