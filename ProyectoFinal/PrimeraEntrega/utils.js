//creamos dirname si trabajamos con mobius, path absoluta
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;