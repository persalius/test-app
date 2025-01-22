'use client';

import { useState } from 'react';
import { useTestData } from '@/hooks/useTestData';
import Select from '@/components/ui/Select';
import { Option } from '@/components/ui/Select/types';

export default function Home() {
  const { data, isFetching } = useTestData();

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleChange = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div className='p-6'>
      <Select
        items={data.results}
        onChange={handleChange}
        isDisabled={isFetching}
      />

      {selectedOption && (
        <div className='mt-6'>
          <pre>{JSON.stringify(selectedOption, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
