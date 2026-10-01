import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useInput from './useInput';

describe('Custom Hook: useInput', () => {
  it('harus mengembalikan nilai default yang diberikan', () => {
    const { result } = renderHook(() => useInput('test'));
    expect(result.current[0]).toBe('test');
  });

  it('harus memperbarui nilai saat event onChange terpanggil', () => {
    const { result } = renderHook(() => useInput(''));
    act(() => {
      result.current[1]({ target: { value: 'Delcom' } });
    });
    expect(result.current[0]).toBe('Delcom');
  });
});