import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CameraCapture from '../CameraCapture.jsx';

// Mock getUserMedia
const mockGetUserMedia = vi.fn();
const mockTrackStop = vi.fn();
const mockStream = { getTracks: () => [{ stop: mockTrackStop }] };

beforeEach(() => {
  vi.clearAllMocks();
  mockGetUserMedia.mockResolvedValue(mockStream);
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: { getUserMedia: mockGetUserMedia },
    writable: true,
    configurable: true,
  });
  // Mock HTMLMediaElement.play
  HTMLVideoElement.prototype.play = vi.fn();
});

describe('CameraCapture', () => {
  it('renders the camera cancel button', () => {
    render(<CameraCapture onCapture={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText('Kanselahin')).toBeTruthy();
  });

  it('renders the shutter button with aria-label', () => {
    render(<CameraCapture onCapture={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText('Kumuha ng larawan')).toBeTruthy();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<CameraCapture onCapture={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Kanselahin'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('requests the environment camera on mount', () => {
    render(<CameraCapture onCapture={vi.fn()} onCancel={vi.fn()} />);
    expect(mockGetUserMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        video: expect.objectContaining({ facingMode: 'environment' }),
      })
    );
  });

  it('calls onError when getUserMedia fails', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('NotAllowedError'));
    const onError = vi.fn();
    render(<CameraCapture onCapture={vi.fn()} onCancel={vi.fn()} onError={onError} />);
    // Wait for the promise to reject
    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  it('has camera-fullscreen class wrapper', () => {
    const { container } = render(<CameraCapture onCapture={vi.fn()} onCancel={vi.fn()} />);
    expect(container.querySelector('.camera-fullscreen')).toBeTruthy();
  });
});
