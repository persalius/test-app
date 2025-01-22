import { useQuery } from '@tanstack/react-query';

export const useTestData = () => {
  const data = useQuery({
    queryKey: ['testData'],
    initialData: { results: [] },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
