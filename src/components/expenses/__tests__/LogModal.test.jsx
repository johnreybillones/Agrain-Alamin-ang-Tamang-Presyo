import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LogModal from '../LogModal.jsx';

// Mock getUserMedia so CameraCapture doesn't crash in tests
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
  HTMLVideoElement.prototype.play = vi.fn();
});

describe('LogModal', () => {
  it('renders nothing when visible is false', () => {
    const { container } = render(
      <LogModal visible={false} onClose={vi.fn()} onSave={vi.fn()} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders camera view when visible is true', () => {
    render(<LogModal visible={true} onClose={vi.fn()} onSave={vi.fn()} />);
    // Camera step shows the cancel button
    expect(screen.getByText('Kanselahin')).toBeTruthy();
  });

  it('renders form step when camera fails', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('Not allowed'));
    render(<LogModal visible={true} onClose={vi.fn()} onSave={vi.fn()} />);
    // Wait for camera error to trigger form step
    await vi.waitFor(() => {
      expect(screen.getByText('Gastusin:')).toBeTruthy();
    });
  });

  it('renders the cancel button in form step', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('fail'));
    render(<LogModal visible={true} onClose={vi.fn()} onSave={vi.fn()} />);
    await vi.waitFor(() => {
      expect(screen.getByText('Kansela')).toBeTruthy();
    });
  });

  it('renders amount input in form step', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('fail'));
    render(<LogModal visible={true} onClose={vi.fn()} onSave={vi.fn()} />);
    await vi.waitFor(() => {
      expect(screen.getByText('Gaano kalaki ang gastos?')).toBeTruthy();
      expect(screen.getByPlaceholderText('Halimbawa: 100')).toBeTruthy();
    });
  });

  it('renders category picker in form step', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('fail'));
    render(<LogModal visible={true} onClose={vi.fn()} onSave={vi.fn()} />);
    await vi.waitFor(() => {
      expect(screen.getByText('Para saan ito?')).toBeTruthy();
      expect(screen.getByText(/Binhi/)).toBeTruthy();
      expect(screen.getByText(/Pataba/)).toBeTruthy();
    });
  });

  it('shows warning when save tapped without size/cat', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('fail'));
    render(<LogModal visible={true} onClose={vi.fn()} onSave={vi.fn()} />);
    await vi.waitFor(() => {
      expect(screen.getByText('Ilista na')).toBeTruthy();
    });
    fireEvent.click(screen.getByText('Ilista na'));
    expect(screen.getByText(/Tukuyin muna/)).toBeTruthy();
  });

  it('calls onClose when cancel button is clicked', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('fail'));
    const onClose = vi.fn();
    render(<LogModal visible={true} onClose={onClose} onSave={vi.fn()} />);
    await vi.waitFor(() => {
      expect(screen.getByText('Kansela')).toBeTruthy();
    });
    fireEvent.click(screen.getByText('Kansela'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
