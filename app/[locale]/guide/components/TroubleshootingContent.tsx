'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CodeBlock from './CodeBlock';

interface TroubleshootingContentProps {
  stepId: string;
}

// Mac 종류 선택 컴포넌트
function MacTypeSelector({ onTypeChange }: { onTypeChange: (type: 'apple-silicon' | 'intel') => void }) {
  const [macType, setMacType] = useState<'apple-silicon' | 'intel'>('apple-silicon');
  const t = useTranslations('guide');
  
  const handleTypeChange = (type: 'apple-silicon' | 'intel') => {
    setMacType(type);
    onTypeChange(type);
  };
  
  return (
    <div className="mac-type-selector">
      <h4>{t('troubleshooting.macTypeSelector.title')}</h4>
      <div className="mac-buttons">
        <button 
          className={`mac-type-btn ${macType === 'apple-silicon' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('apple-silicon')}
        >
          {t('troubleshooting.macTypeSelector.appleSilicon')}
        </button>
        <button 
          className={`mac-type-btn ${macType === 'intel' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('intel')}
        >
          {t('troubleshooting.macTypeSelector.intel')}
        </button>
      </div>
    </div>
  );
}

export default function TroubleshootingContent({ stepId }: TroubleshootingContentProps) {
  const [macType, setMacType] = useState<'apple-silicon' | 'intel'>('apple-silicon');
  const t = useTranslations('guide');
  
  // Homebrew 단계
  if (stepId === 'homebrew') {
    return (
      <div>
        <MacTypeSelector onTypeChange={setMacType} />
        
        <div className="mac-solution" id="apple-silicon-solution" style={{ display: macType === 'apple-silicon' ? 'block' : 'none' }}>
          <h4>{t('troubleshooting.homebrew.appleSilicon.title')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.homebrew.appleSilicon.instruction') }} />
          <p>{t('troubleshooting.homebrew.appleSilicon.step1')}</p>
          <CodeBlock>{`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`}</CodeBlock>
          <p>{t('troubleshooting.homebrew.appleSilicon.step2')}</p>
          <CodeBlock>eval "$(/opt/homebrew/bin/brew shellenv)"</CodeBlock>
          <p>{t('troubleshooting.homebrew.appleSilicon.step3')}</p>
          <CodeBlock>brew --version</CodeBlock>
        </div>
        
        <div className="mac-solution" id="intel-solution" style={{ display: macType === 'intel' ? 'block' : 'none' }}>
          <h4>{t('troubleshooting.homebrew.intel.title')}</h4>
          <p dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.homebrew.intel.instruction') }} />
          <p>{t('troubleshooting.homebrew.intel.step1')}</p>
          <CodeBlock>{`echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile`}</CodeBlock>
          <p>{t('troubleshooting.homebrew.intel.step2')}</p>
          <CodeBlock>eval "$(/usr/local/bin/brew shellenv)"</CodeBlock>
          <p>{t('troubleshooting.homebrew.intel.step3')}</p>
          <CodeBlock>brew --version</CodeBlock>
        </div>
      </div>
    );
  }
  
  // Git for Windows 단계
  if (stepId === 'git-windows') {
    return (
      <div>
        <h4>{t('troubleshooting.gitWindows.title')}</h4>
        
        <h5>{t('troubleshooting.gitWindows.step1Title')}</h5>
        
        <div className="simple-list-box">
          <ul>
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.gitWindows.step1_1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.gitWindows.step1_2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.gitWindows.step1_3') }} />
          </ul>
        </div>
        
        <h5>{t('troubleshooting.gitWindows.step2Title')}</h5>
        <p>{t('troubleshooting.gitWindows.step2Description')}</p>
        
        <h5>{t('troubleshooting.gitWindows.step3Title')}</h5>
        <p>{t('troubleshooting.gitWindows.step3Description')}</p>
      </div>
    );
  }
  
  // Node.js Mac 단계
  if (stepId === 'node') {
    return (
      <div>
        <h4>{t('troubleshooting.node.title')}</h4>
        <p>{t('troubleshooting.node.step1')}</p>
        <CodeBlock>brew list | grep node</CodeBlock>
        
        <p>{t('troubleshooting.node.step2')}</p>
        <CodeBlock>brew install node</CodeBlock>
        
        <p>{t('troubleshooting.node.step3')}</p>
        <CodeBlock>brew reinstall node</CodeBlock>
        
        <p>{t('troubleshooting.node.step4')}</p>
        <p className="install-note">{t('troubleshooting.node.appleSiliconNote')}</p>
        <CodeBlock>{`echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc`}</CodeBlock>
        <p className="install-note">{t('troubleshooting.node.intelNote')}</p>
        <CodeBlock>{`echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc`}</CodeBlock>
        <CodeBlock>source ~/.zshrc</CodeBlock>
        
        <p>{t('troubleshooting.node.step5')}</p>
      </div>
    );
  }
  
  // Node.js Windows 단계
  if (stepId === 'node-windows') {
    return (
      <div>
        <h4>{t('troubleshooting.nodeWindows.title')}</h4>
        
        <h5>{t('troubleshooting.nodeWindows.step1Title')}</h5>
        <p>{t('troubleshooting.nodeWindows.step1Description')}</p>
        
        <h5>{t('troubleshooting.nodeWindows.step2Title')}</h5>
        <p>{t('troubleshooting.nodeWindows.step2Description')}</p>
        
        <h5>{t('troubleshooting.nodeWindows.step3Title')}</h5>
        <p>{t('troubleshooting.nodeWindows.step3Description')}</p>
      </div>
    );
  }
  
  // Claude Code Mac 단계
  if (stepId === 'claude') {
    return (
      <div>
        <h4>{t('troubleshooting.claude.title')}</h4>
        
        <p>{t('troubleshooting.claude.step1')}</p>
        <CodeBlock>npm list -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>{t('troubleshooting.claude.step2')}</p>
        <CodeBlock>npm config get prefix</CodeBlock>
        
        <p>{t('troubleshooting.claude.step3')}</p>
        <CodeBlock>{`echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc`}</CodeBlock>
        <CodeBlock>source ~/.zshrc</CodeBlock>
        
        <p>{t('troubleshooting.claude.step4')}</p>
        <CodeBlock>npm uninstall -g @anthropic-ai/claude-code && npm install -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>{t('troubleshooting.claude.step5')}</p>
      </div>
    );
  }
  
  // Claude Code Windows 단계
  if (stepId === 'claude-windows') {
    return (
      <div>
        <h4>{t('troubleshooting.claudeWindows.title')}</h4>
        
        <p>{t('troubleshooting.claudeWindows.step1')}</p>
        <CodeBlock>npm list -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>{t('troubleshooting.claudeWindows.step2')}</p>
        <CodeBlock>npm install -g @anthropic-ai/claude-code</CodeBlock>
        
        <p>{t('troubleshooting.claudeWindows.step3')}</p>
        <p>{t('troubleshooting.claudeWindows.step3Description')}</p>
        
        <p>{t('troubleshooting.claudeWindows.step4')}</p>
        <p>{t('troubleshooting.claudeWindows.step4Description')}</p>
      </div>
    );
  }
  
  // Auth Mac 단계
  if (stepId === 'auth') {
    return (
      <div>
        <h4>{t('troubleshooting.auth.browserNotOpenTitle')}</h4>
        <p>{t('troubleshooting.auth.browserNotOpenDesc')}</p>
        <p className="install-note" dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.auth.browserNotOpenNote') }} />
        
        <h4>{t('troubleshooting.auth.loginNotCompleteTitle')}</h4>
        <p>{t('troubleshooting.auth.loginNotCompleteStep1')}</p>
        <CodeBlock>claude auth logout</CodeBlock>
        <CodeBlock>claude auth login</CodeBlock>
        
        <p>{t('troubleshooting.auth.loginNotCompleteStep2')}</p>
        
        <h4>{t('troubleshooting.auth.accountIssueTitle')}</h4>
        <p dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.auth.accountIssueDesc') }} />
      </div>
    );
  }
  
  // Auth Windows 단계
  if (stepId === 'auth-windows') {
    return (
      <div>
        <h4>{t('troubleshooting.auth.browserNotOpenTitle')}</h4>
        <p>{t('troubleshooting.auth.browserNotOpenDesc')}</p>
        <p className="install-note" dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.auth.browserNotOpenNote') }} />
        
        <h4>{t('troubleshooting.auth.loginNotCompleteTitle')}</h4>
        <p>{t('troubleshooting.auth.loginNotCompleteStep1')}</p>
        <CodeBlock>claude auth logout</CodeBlock>
        <CodeBlock>claude auth login</CodeBlock>
        
        <p>{t('troubleshooting.auth.loginNotCompleteStep2')}</p>
        
        <h4>{t('troubleshooting.auth.accountIssueTitle')}</h4>
        <p dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.auth.accountIssueDesc') }} />
      </div>
    );
  }
  
  // Project Mac 단계
  if (stepId === 'project') {
    return (
      <div>
        <h4>{t('troubleshooting.project.permissionTitle')}</h4>
        <p>{t('troubleshooting.project.permissionDesc')}</p>
        <CodeBlock>cd ~</CodeBlock>
        <CodeBlock>mkdir my-first-project && cd my-first-project</CodeBlock>
        <CodeBlock>claude</CodeBlock>
        <p className="install-note">{t('troubleshooting.project.permissionNote')}</p>
        
        <h4>{t('troubleshooting.project.connectTitle')}</h4>
        <p>{t('troubleshooting.project.connectDesc')}</p>
        <div className="simple-list-box">
          <ul>
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.project.connectCheck1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.project.connectCheck2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.project.connectCheck3Mac') }} />
          </ul>
        </div>
        
        <h4>{t('troubleshooting.project.stillNotWorkTitle')}</h4>
        <p>{t('troubleshooting.project.stillNotWorkDesc')}</p>
        <div className="simple-list-box">
          <ul>
            <li>{t('troubleshooting.project.stillNotWorkStep1Mac')}</li>
            <li>{t('troubleshooting.project.stillNotWorkStep2')}</li>
            <li>{t('troubleshooting.project.stillNotWorkStep3Mac')}</li>
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
        <h4>{t('troubleshooting.project.permissionTitle')}</h4>
        <p>{t('troubleshooting.project.permissionDesc')}</p>
        <CodeBlock>cd %USERPROFILE%</CodeBlock>
        <CodeBlock>mkdir my-first-project && cd my-first-project</CodeBlock>
        <CodeBlock>claude</CodeBlock>
        <p className="install-note">{t('troubleshooting.project.permissionNote')}</p>
        
        <h4>{t('troubleshooting.project.connectTitle')}</h4>
        <p>{t('troubleshooting.project.connectDesc')}</p>
        <div className="simple-list-box">
          <ul>
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.project.connectCheck1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.project.connectCheck2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('troubleshooting.project.connectCheck3Windows') }} />
          </ul>
        </div>
        
        <h4>{t('troubleshooting.project.stillNotWorkTitle')}</h4>
        <p>{t('troubleshooting.project.stillNotWorkDesc')}</p>
        <div className="simple-list-box">
          <ul>
            <li>{t('troubleshooting.project.stillNotWorkStep1Windows')}</li>
            <li>{t('troubleshooting.project.stillNotWorkStep2')}</li>
            <li>{t('troubleshooting.project.stillNotWorkStep3Windows')}</li>
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