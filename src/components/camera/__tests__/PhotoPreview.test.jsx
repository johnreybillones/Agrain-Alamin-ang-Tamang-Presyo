import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotoPreview from '../PhotoPreview.jsx';

describe('PhotoPreview', () => {
  const fakeDataUrl = 'data:image/jpeg;base64,/9j/fake';

  it('renders nothing when photoData is null', () => {
    const { container } = render(<PhotoPreview photoData={null} onRetake={vi.fn()} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the photo image when photoData is provided', () => {
    render(<PhotoPreview photoData={fakeDataUrl} onRetake={vi.fn()} />);
    const img = screen.getByAltText('Larawan ng resibo');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe(fakeDataUrl);
  });

  it('renders the retake button', () => {
    render(<PhotoPreview photoData={fakeDataUrl} onRetake={vi.fn()} />);
    expect(screen.getByText(/Ulitin/)).toBeTruthy();
  });

  it('calls onRetake when retake button is clicked', () => {
    const onRetake = vi.fn();
    render(<PhotoPreview photoData={fakeDataUrl} onRetake={onRetake} />);
    fireEvent.click(screen.getByText(/Ulitin/));
    expect(onRetake).toHaveBeenCalledTimes(1);
  });
});
