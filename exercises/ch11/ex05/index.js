export function detectFileType(buffer) {
  const bytes = new Uint8Array(buffer);
  // PDF: 25 50 44 46 2D
  if (
    bytes[0] === 0x25 && // 0x25 = '%'
    bytes[1] === 0x50 && // 0x50 = 'P'
    bytes[2] === 0x44 && // 0x44 = 'D'
    bytes[3] === 0x46 && // 0x46 = 'F'
    bytes[4] === 0x2d // 0x2d = '-'
  ) {
    return 'PDF';
  }
  // ZIP: 50 4B 03 04, 50 4B 05 06, 50 4B 07 08
  if (
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    ((bytes[2] === 0x03 && bytes[3] === 0x04) ||
      (bytes[2] === 0x05 && bytes[3] === 0x06) ||
      (bytes[2] === 0x07 && bytes[3] === 0x08))
  ) {
    return 'ZIP';
  }
  // GIF: 47 49 46 38 37 61 or 47 49 46 38 39 61
  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) &&
    bytes[5] === 0x61
  ) {
    return 'GIF';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return 'PNG';
  }
  // UNKNOWN
  return 'UNKNOWN';
}
