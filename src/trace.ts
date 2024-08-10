import { execSync } from 'node:child_process'

export function fetchTrace(proxy?: string | false) {
  const command = `curl https://www.cloudflare.com/cdn-cgi/trace/${proxy ? ` -x ${proxy}` : ""}`
  const text = execSync(command).toString()
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
