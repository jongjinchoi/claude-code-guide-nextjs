'use client';

import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface TroubleshootingContentProps {
  stepId: string;
}

// Mac 종류 선택 컴포넌트
function MacTypeSelector({ onTypeChange }: { onTypeChange: (type: 'apple-silicon' | 'intel') => void }) {
  const [macType, setMacType] = useState<'apple-silicon' | 'intel'>('apple-silicon');
  
  const handleTypeChange = (type: 'apple-silicon' | 'intel') => {
    setMacType(type);
    onTypeChange(type);
  };
  
  return (
    <div className="mac-type-selector">
      <h4>Mac 종류를 선택하세요:</h4>
      <div className="mac-buttons">
        <button 
          className={`mac-type-btn ${macType === 'apple-silicon' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('apple-silicon')}
        >
          Apple Silicon (M1/M2/M3/M4)
        </button>
        <button 
          className={`mac-type-btn ${macType === 'intel' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('intel')}
        >
          Intel Mac
        </button>
      </div>
    </div>
  );
}

export default function TroubleshootingContent({ stepId }: TroubleshootingContentProps) {
  const [macType, setMacType] = useState<'apple-silicon' | 'intel'>('apple-silicon');
  
  // Homebrew 단계
  if (stepId === 'homebrew') {
    return (
      <div>
        <MacTypeSelector onTypeChange={setMacType} />
        
        <div className="mac-solution" id="apple-silicon-solution" style={{ display: macType === 'apple-silicon' ? 'block' : 'none' }}>
          <h4>Apple Silicon Mac 해결 방법:</h4>
          <p>아래 명령어를 <strong>순서대로</strong> 실행하세요:</p>
          <p>1. PATH 설정을 파일에 저장:</p>
          <CodeBlock>{`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`}</CodeBlock>
          <p>2. 현재 터미널에 즉시 적용:</p>
          <CodeBlock>eval "$(/opt/homebrew/bin/brew shellenv)"</CodeBlock>
          <p>3. 다시 확인해보세요:</p>
          <CodeBlock>brew --version</CodeBlock>
        </div>
        
        <div className="mac-solution" id="intel-solution" style={{ display: macType === 'intel' ? 'block' : 'none' }}>
          <h4>Intel Mac 해결 방법:</h4>
          <p>아래 명령어를 <strong>순서대로</strong> 실행하세요:</p>
          <p>1. PATH 설정을 파일에 저장:</p>
          <CodeBlock>{`echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile`}</CodeBlock>
          <p>2. 현재 터미널에 즉시 적용:</p>
          <CodeBlock>eval "$(/usr/local/bin/brew shellenv)"</CodeBlock>
          <p>3. 다시 확인해보세요:</p>
          <CodeBlock>brew --version</CodeBlock>
        </div>
      </div>
    );
  }
  
  // Git for Windows 단계
  if (stepId === 'git-windows') {
    return (
      <div>
        <h4>문제 해결</h4>
        
        <h5>명령 프롬프트를 다시 시작했는데도 git을 찾을 수 없는 경우:</h5>
        
        <div className="simple-list-box">
          <ul>
            <li><strong>1단계:</strong> 모든 명령 프롬프트 창을 닫으세요</li>
            <li><strong>2단계:</strong> 시작 메뉴에서 "명령 프롬프트"를 다시 검색하여 실행</li>
            <li><strong>3단계:</strong> git --version 다시 입력</li>
          </ul>
        </div>
        
        <h5>그래도 안 되면 컴퓨터를 재시작하세요:</h5>
        <p>설치는 정상적으로 됐지만 환경 변수가 적용되지 않은 경우입니다. 컴퓨터를 재시작하면 해결됩니다.</p>
        
        <h5>재시작 후에도 안 되면:</h5>
        <p>Git 설치 프로그램을 다시 실행하고, 설치 옵션 중 "Git from the command line and also from 3rd-party software" 옵션이 선택되어 있는지 확인하세요.</p>
      </div>
    );
  }
  
  // Node.js Mac 단계
  if (stepId === 'node') {
    return (
      <div>
        <h4>Node.js가 인식되지 않는 경우:</h4>
        <p>1. 먼저 Node.js 설치 확인:</p>
        <CodeBlock>brew list | grep node</CodeBlock>
        
        <p>2. 설치되지 않았다면:</p>
        <CodeBlock>brew install node</CodeBlock>
        
        <p>3. 이미 설치되어 있다면 재설치:</p>
        <CodeBlock>brew reinstall node</CodeBlock>
        
        <p>4. PATH 설정 문제일 수 있습니다:</p>
        <p className="install-note">💡 Apple Silicon Mac (M1/M2/M3/M4):</p>
        <CodeBlock>{`echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc`}</CodeBlock>
        <p className="install-note">💡 Intel Mac:</p>
        <CodeBlock>{`echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc`}</CodeBlock>
        <CodeBlock>source ~/.zshrc</CodeBlock>
        
        <p>5. 그래도 안 되면 터미널을 완전히 종료하고 다시 열어보세요.</p>
      </div>
    );
  }
  
  // Node.js Windows 단계
  if (stepId === 'node-windows') {
    return (
      <div>
        <h4>Node.js가 인식되지 않는 경우:</h4>
        
        <h5>1. 명령 프롬프트를 다시 시작하세요:</h5>
        <p>모든 명령 프롬프트 창을 닫고 새로 열어보세요.</p>
        
        <h5>2. 그래도 안 되면:</h5>
        <p>컴퓨터를 재시작하세요. Node.js 설치 후 환경 변수가 적용되려면 재시작이 필요할 수 있습니다.</p>
        
        <h5>3. 재시작 후에도 안 되면:</h5>
        <p>Node.js 설치 프로그램을 다시 실행하고, 설치 중 "Automatically install the necessary tools" 옵션이 선택되어 있는지 확인하세요.</p>
      </div>
    );
  }
  
  // Claude Code Mac 단계
  if (stepId === 'claude') {
    return (
      <div>
        <h4>Claude Code가 인식되지 않는 경우:</h4>
        
        <p>1. 먼저 설치 확인:</p>
        <CodeBlock>npm list -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>2. npm 글로벌 경로 확인:</p>
        <CodeBlock>npm config get prefix</CodeBlock>
        
        <p>3. PATH에 npm 글로벌 경로 추가:</p>
        <CodeBlock>{`echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc`}</CodeBlock>
        <CodeBlock>source ~/.zshrc</CodeBlock>
        
        <p>4. 그래도 안 되면 재설치:</p>
        <CodeBlock>npm uninstall -g @anthropic-ai/claude-code && npm install -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>5. 터미널을 완전히 종료하고 다시 열어보세요.</p>
      </div>
    );
  }
  
  // Claude Code Windows 단계
  if (stepId === 'claude-windows') {
    return (
      <div>
        <h4>Claude Code가 인식되지 않는 경우:</h4>
        
        <p>1. 먼저 설치 확인:</p>
        <CodeBlock>npm list -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>2. 설치되어 있지 않다면 다시 설치:</p>
        <CodeBlock>npm install -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>3. 그래도 안 되면:</p>
        <p>명령 프롬프트를 관리자 권한으로 실행하고 다시 설치해보세요.</p>
        
        <p>4. 여전히 안 되면:</p>
        <p>컴퓨터를 재시작하고 다시 시도해보세요.</p>
      </div>
    );
  }
  
  // Auth Mac 단계
  if (stepId === 'auth') {
    return (
      <div>
        <h4>브라우저가 열리지 않는 경우:</h4>
        <p>터미널에 표시된 URL을 직접 복사해서 브라우저에 붙여넣으세요.</p>
        <p className="install-note">💡 URL은 보통 <code>https://claude.ai/auth/...</code> 형태입니다.</p>
        
        <h4>로그인이 완료되지 않는 경우:</h4>
        <p>1. 로그아웃 후 다시 시도:</p>
        <CodeBlock>claude auth logout</CodeBlock>
        <CodeBlock>claude auth login</CodeBlock>
        
        <p>2. 그래도 안 되면 브라우저에서 쿠키를 삭제하고 다시 시도하세요.</p>
        
        <h4>계정 관련 문제:</h4>
        <p>Claude 웹사이트(<a href="https://claude.ai" target="_blank">claude.ai</a>)에서 계정이 정상인지 확인하세요.</p>
      </div>
    );
  }
  
  // Auth Windows 단계
  if (stepId === 'auth-windows') {
    return (
      <div>
        <h4>브라우저가 열리지 않는 경우:</h4>
        <p>터미널에 표시된 URL을 직접 복사해서 브라우저에 붙여넣으세요.</p>
        <p className="install-note">💡 URL은 보통 <code>https://claude.ai/auth/...</code> 형태입니다.</p>
        
        <h4>로그인이 완료되지 않는 경우:</h4>
        <p>1. 로그아웃 후 다시 시도:</p>
        <CodeBlock>claude auth logout</CodeBlock>
        <CodeBlock>claude auth login</CodeBlock>
        
        <p>2. 그래도 안 되면 브라우저에서 쿠키를 삭제하고 다시 시도하세요.</p>
        
        <h4>계정 관련 문제:</h4>
        <p>Claude 웹사이트(<a href="https://claude.ai" target="_blank">claude.ai</a>)에서 계정이 정상인지 확인하세요.</p>
      </div>
    );
  }
  
  // Project Mac 단계
  if (stepId === 'project') {
    return (
      <div>
        <h4>📁 "Permission denied" 오류가 나타날 때:</h4>
        <p>권한 문제입니다. 홈 폴더에서 시작하세요:</p>
        <CodeBlock>cd ~</CodeBlock>
        <CodeBlock>mkdir my-first-project && cd my-first-project</CodeBlock>
        <CodeBlock>claude</CodeBlock>
        <p className="install-note">💡 홈 폴더는 항상 권한이 있으니 거기서 시작하세요!</p>
        
        <h4>🌐 "Cannot connect" 오류가 나타날 때:</h4>
        <p>네트워크 연결 문제입니다. 아래 항목들을 확인하세요:</p>
        <div className="simple-list-box">
          <ul>
            <li><strong>Wi-Fi 확인</strong> - 인터넷 연결되었나요?</li>
            <li><strong>브라우저 테스트</strong> - 구글 접속되나요?</li>
            <li><strong>터미널 재시작</strong> - 터미널 닫고 다시 열어보세요</li>
          </ul>
        </div>
        
        <h4>🔄 그래도 안 될 때:</h4>
        <p>가장 간단한 해결책을 시도해보세요:</p>
        <div className="simple-list-box">
          <ul>
            <li>터미널 완전히 종료</li>
            <li>컴퓨터 재시작</li>
            <li>터미널 다시 열고 아래 명령어 실행</li>
          </ul>
        </div>
        <CodeBlock>cd ~ && claude</CodeBlock>
      </div>
    );
  }
  
  // Project Windows 단계
  if (stepId === 'project-windows') {
    return (
      <div>
        <h4>📁 "Permission denied" 오류가 나타날 때:</h4>
        <p>권한 문제입니다. 사용자 폴더에서 시작하세요:</p>
        <CodeBlock>cd %USERPROFILE%</CodeBlock>
        <CodeBlock>mkdir my-first-project && cd my-first-project</CodeBlock>
        <CodeBlock>claude</CodeBlock>
        <p className="install-note">💡 사용자 폴더는 항상 권한이 있으니 거기서 시작하세요!</p>
        
        <h4>🌐 "Cannot connect" 오류가 나타날 때:</h4>
        <p>네트워크 연결 문제입니다. 아래 항목들을 확인하세요:</p>
        <div className="simple-list-box">
          <ul>
            <li><strong>Wi-Fi 확인</strong> - 인터넷 연결되었나요?</li>
            <li><strong>브라우저 테스트</strong> - 구글 접속되나요?</li>
            <li><strong>명령 프롬프트 재시작</strong> - 창 닫고 다시 열어보세요</li>
          </ul>
        </div>
        
        <h4>🔄 그래도 안 될 때:</h4>
        <p>가장 간단한 해결책을 시도해보세요:</p>
        <div className="simple-list-box">
          <ul>
            <li>명령 프롬프트 완전히 종료</li>
            <li>컴퓨터 재시작</li>
            <li>명령 프롬프트 다시 열고 아래 명령어 실행</li>
          </ul>
        </div>
        <CodeBlock>cd %USERPROFILE% && claude</CodeBlock>
      </div>
    );
  }
  
  // 기본 콘텐츠
  return (
    <div>
      <h4>문제 해결 방법</h4>
      <p>이 단계에 대한 구체적인 문제 해결 방법이 준비 중입니다.</p>
    </div>
  );
}