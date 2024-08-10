import { execSync } from 'node:child_process'

export function fetchTrace() {
  const url = `https://www.cloudflare.com/cdn-cgi/trace/`
  const text = execSync(url).toString()
  const lines = text.split('\n');
  const dataObject: Record<string, string> = {};

  lines.forEach(line => {
    if (line) { // 忽略空行
      const [key, value] = line.split('=');
      dataObject[key] = value;
    }
  });
  return dataObject
}
