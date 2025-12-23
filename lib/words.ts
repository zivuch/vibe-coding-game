// Comprehensive dev word list (145+ terms)
export const DEV_WORDS = [
  // Languages & Frameworks
  'ASYNC', 'AWAIT', 'REACT', 'REDUX', 'FETCH', 'BABEL', 'VITE',
  'NGINX', 'SWIFT', 'SCALA', 'GROOVY', 'FLASK', 'RAILS', 'TORCH',
  'DJANGO', 'APACHE', 'LARAVEL',

  // Concepts & Patterns
  'CACHE', 'STACK', 'QUEUE', 'ARRAY', 'CLASS', 'TRAIT', 'MIXIN',
  'SCOPE', 'PROXY', 'MUTEX', 'EVENT', 'STATE', 'PROPS', 'HOOKS',
  'ROUTE', 'QUERY', 'INDEX', 'CLONE', 'PARSE', 'SPLIT', 'SLICE',
  'SHIFT', 'FILTER', 'REDUCE', 'UNION', 'TUPLE',

  // Data & Storage
  'REDIS', 'MONGO', 'MYSQL', 'TABLE', 'FIELD', 'JOINS',
  'GRAPH', 'NODES', 'EDGES', 'SHARD', 'STORE',

  // DevOps & Tools
  'DOCKER', 'BUILD', 'DEPLOY', 'MERGE', 'CLONE', 'BRANCH', 'STASH',
  'REBASE', 'COMMIT', 'SHELL', 'CRON', 'PATCH', 'TOKEN', 'IMAGE',
  'LAYER', 'AGENT',

  // Web & APIs
  'HTTPS', 'AJAX', 'JSON', 'OAUTH', 'COOKIE', 'BEARER',
  'SOCKET', 'STREAM', 'BINARY', 'CODEC', 'CORS',

  // Programming Terms
  'DEBUG', 'ERROR', 'THROW', 'CATCH', 'BLOCK', 'LOOP', 'BREAK',
  'WHILE', 'CONST', 'FALSE', 'TRUE', 'VOID', 'FLOAT',
  'BYTES', 'CHARS', 'REGEX', 'FINAL', 'LOCAL', 'GLOBAL', 'STATIC',

  // Testing & Quality
  'TESTS', 'MOCHA', 'ASSERT', 'MOCK', 'SUITE', 'GIVEN',

  // Architecture
  'MICRO', 'LAYER', 'SOLID', 'CLEAN', 'HEXA', 'ONION', 'SAGA',

  // Security
  'HASH', 'SALT', 'CIPHER', 'HMAC', 'NONCE', 'VAULT',

  // Performance
  'LAZY', 'EAGER', 'BATCH', 'CHUNK',

  // Graphics & Rendering
  'PIXEL', 'FRAME', 'RENDER', 'PAINT', 'BLEND',

  // Math & Data
  'MATRIX', 'VECTOR', 'OCTAL', 'ENUM',

  // Cloud & Infrastructure
  'CLOUD', 'PAAS', 'SAAS', 'IAAS',

  // Additional variety
  'NULL', 'ISNAN', 'PARAM', 'IIFE', 'MEDIA',
  'XLIFF', 'XHTML', 'XPATH', 'XSLT',
  'STDIO', 'STDIN', 'STDOUT',
  'SUPER', 'YIELD', 'PRINT', 'MKDIR', 'CHMOD',
  'ALIAS', 'GZIP', 'BZIP', 'WGET', 'CURL',
  'GREP', 'EGREP', 'FGREP',
  'CHMOD', 'CHOWN', 'CHGRP',
  'PATCH', 'DIFF', 'UNZIP',
  'MAVEN', 'GRUNT', 'BOWER',
  'NGINX', 'GUNICORN',
];

// Valid word list includes all possible guesses (same as answer list for now)
export const VALID_GUESSES = DEV_WORDS;

export function getRandomWord(): string {
  return DEV_WORDS[Math.floor(Math.random() * DEV_WORDS.length)];
}

export function getDailyWord(): string {
  // Deterministic daily word based on date
  const startDate = new Date('2025-01-01');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const index = daysSinceStart % DEV_WORDS.length;
  return DEV_WORDS[index];
}

export function isValidWord(word: string): boolean {
  return VALID_GUESSES.includes(word.toUpperCase());
}
