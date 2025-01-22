import { Option } from '@/components/ui/Select/types';
import { useQuery } from '@tanstack/react-query';

interface Item {
  Name: string;
  objectId: string;
}

export const useTestData = () => {
  const data = useQuery({
    queryKey: ['testData'],
    initialData: { results: [] },
    select: (data: { results: Item[] }) => {
      const results: Option[] = data.results.map((item) => ({
        id: item.objectId,
        name: item.Name,
      }));
      return { results };
    },
    queryFn: () =>
      fetch(
        'https://parseapi.back4app.com/classes/NamesList?limit=500&keys=Name',
        {
          headers: {
            'X-Parse-Application-Id':
              'zsSkPsDYTc2hmphLjjs9hz2Q3EXmnSxUyXnouj1I', // This is the fake app's application id
            'X-Parse-Master-Key': '4LuCXgPPXXO2sU5cXm6WwpwzaKyZpo3Wpj4G4xXK', // This is the fake app's readonly master key
          },
        },
      ).then((res) => res.json()),
  });

  return data;
};
