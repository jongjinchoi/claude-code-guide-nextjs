const fs = require('fs');
const path = require('path');
const https = require('https');

// 버전 변경사항을 추적하기 위한 객체
const versionChanges = [];

// HTTPS 요청을 Promise로 래핑하는 함수
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'claude-code-guide-updater'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// 각 패키지의 최신 버전을 가져오는 함수들
async function getLatestHomebrewVersion() {
  try {
    const data = await httpsGet('https://api.github.com/repos/Homebrew/brew/releases/latest');
    const version = data.tag_name ? data.tag_name : '4.5.13';
    return version;
  } catch (error) {
    console.error('Failed to fetch Homebrew version:', error);
    return '4.5.13'; // 폴백 버전
  }
}

async function getLatestNodeLTSVersion() {
  try {
    const data = await httpsGet('https://api.github.com/repos/nodejs/node/releases');
    // LTS 버전 찾기 (짝수 메이저 버전)
    for (const release of data) {
      if (!release.prerelease && release.tag_name.startsWith('v')) {
        const version = release.tag_name;
        const major = parseInt(version.substring(1).split('.')[0]);
        if (major % 2 === 0) {
          return version;
        }
      }
    }
    return 'v22.18.0'; // 폴백 버전
  } catch (error) {
    console.error('Failed to fetch Node.js version:', error);
    return 'v22.18.0';
  }
}

async function getLatestNpmVersion() {
  try {
    const data = await httpsGet('https://registry.npmjs.org/npm/latest');
    return data.version || '11.5.2';
  } catch (error) {
    console.error('Failed to fetch npm version:', error);
    return '11.5.2';
  }
}

async function getLatestClaudeCodeVersion() {
  try {
    const data = await httpsGet('https://registry.npmjs.org/@anthropic-ai/claude-code/latest');
    return data.version || '1.0.67';
  } catch (error) {
    console.error('Failed to fetch Claude Code version:', error);
    return '1.0.67';
  }
}

async function getLatestGitForWindowsVersion() {
  try {
    const data = await httpsGet('https://api.github.com/repos/git-for-windows/git/releases/latest');
    const tagName = data.tag_name || 'v2.50.1.windows.1';
    // v2.50.1.windows.1 형태에서 버전만 추출
    const version = tagName.replace('v', '');
    return version;
  } catch (error) {
    console.error('Failed to fetch Git for Windows version:', error);
    return '2.50.1.windows.1';
  }
}

// 파일 업데이트 함수
function updateFile(filePath, replacements) {
  const fullPath = path.join(__dirname, '..', filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  let hasChanges = false;

  for (const { pattern, replacement } of replacements) {
    const regex = new RegExp(pattern, 'g');
    const newContent = content.replace(regex, replacement);
    
    if (newContent !== content) {
      hasChanges = true;
      const matches = content.match(regex);
      if (matches) {
        matches.forEach(match => {
          versionChanges.push(`- ${match} → ${replacement}`);
        });
      }
    }
    
    content = newContent;
  }

  if (hasChanges) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
  
  return hasChanges;
}

// 메인 함수
async function main() {
  console.log('Fetching latest versions...');
  
  // 모든 최신 버전 가져오기
  const [homebrew, nodejs, npm, claudeCode, gitForWindows] = await Promise.all([
    getLatestHomebrewVersion(),
    getLatestNodeLTSVersion(),
    getLatestNpmVersion(),
    getLatestClaudeCodeVersion(),
    getLatestGitForWindowsVersion()
  ]);

  console.log('Latest versions:');
  console.log(`- Homebrew: ${homebrew}`);
  console.log(`- Node.js LTS: ${nodejs}`);
  console.log(`- npm: ${npm}`);
  console.log(`- Claude Code: ${claudeCode}`);
  console.log(`- Git for Windows: ${gitForWindows}`);

  let filesUpdated = false;

  // stepContentData.ts 업데이트
  const stepContentUpdated = updateFile('app/guide/utils/stepContentData.ts', [
    { 
      pattern: `예시: Homebrew \\d+\\.\\d+\\.\\d+`, 
      replacement: `예시: Homebrew ${homebrew}` 
    },
    { 
      pattern: `예시: v\\d+\\.\\d+\\.\\d+`, 
      replacement: `예시: ${nodejs}` 
    },
    { 
      pattern: `예시: @anthropic-ai/claude-code/[\\d\\.]+`, 
      replacement: `예시: @anthropic-ai/claude-code/${claudeCode}` 
    },
    { 
      pattern: `예시: git version [\\d\\.]+\\.windows\\.\\d+`, 
      replacement: `예시: git version ${gitForWindows}` 
    }
  ]);

  if (stepContentUpdated) filesUpdated = true;

  // TerminalExample.tsx 업데이트
  const terminalExampleUpdated = updateFile('app/guide/components/TerminalExample.tsx', [
    { 
      pattern: `'Homebrew \\d+\\.\\d+\\.\\d+'`, 
      replacement: `'Homebrew ${homebrew}'` 
    },
    { 
      pattern: `'v\\d+\\.\\d+\\.\\d+'`, 
      replacement: `'${nodejs}'` 
    },
    { 
      pattern: `'\\d+\\.\\d+\\.\\d+'(.*npm)`, 
      replacement: `'${npm}'$1` 
    },
    { 
      pattern: `'@anthropic-ai/claude-code/[\\d\\.]+'`, 
      replacement: `'@anthropic-ai/claude-code/${claudeCode}'` 
    },
    { 
      pattern: `'git version [\\d\\.]+\\.windows\\.\\d+'`, 
      replacement: `'git version ${gitForWindows}'` 
    }
  ]);

  if (terminalExampleUpdated) filesUpdated = true;

  // GitHub Actions 출력 설정 (새로운 방식)
  if (filesUpdated && versionChanges.length > 0) {
    const changesOutput = versionChanges.join('\n');
    // GitHub Actions 환경 파일 사용
    if (process.env.GITHUB_OUTPUT) {
      const fs = require('fs');
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `version_changes<<EOF\n${changesOutput}\nEOF\n`);
    } else {
      console.log('Version changes:', changesOutput);
    }
  }

  console.log(filesUpdated ? 'Version updates completed!' : 'No version updates needed.');
}

// 스크립트 실행
main().catch(console.error);