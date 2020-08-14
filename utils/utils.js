export function createChunks(array, chunkSize) {
	const chunks = []
  const n = array.length;
  let i = 0

  while (i < n) {
    chunks.push(array.slice(i, i += chunkSize));
  }

  return chunks;
}