'use client';

import { useTestData } from '@/hooks/useTestData';
import Select from '@/components/ui/Select';
import { Option } from '@/components/ui/Select/types';

export default function Home() {
  const { data } = useTestData();

  const handleChange = (option: Option) => {
    console.log(option);
  };

  return (
    <div className='p-6'>
      <Select items={data.results} onChange={handleChange} />

      {/* <Select label='Select' items={data}>
        {({ item }) => <ListItem id={item.id}>{item.name}</ListItem>}
      </Select> */}
    </div>
  );
}
