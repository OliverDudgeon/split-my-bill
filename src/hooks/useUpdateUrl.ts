import { useEffect } from 'react';

import throttle from 'just-throttle';

import type { FormikFormState } from '../types';
import { compressEncode, minify } from '../utils/serialisation';

const updateUrl = throttle((url: string) => {
  window.history.pushState('', '', url);
}, 500);

export function useUpdateUrl(values: FormikFormState): void {
  // Update URL with encoded data
  useEffect(() => {
    const minified = minify({ ...values });
    const url = compressEncode(minified);
    updateUrl(`?${url}`);
  });
}
