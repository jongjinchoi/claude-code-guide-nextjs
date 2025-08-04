'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ReturnToGuide from '@/app/components/ReturnToGuide'
import '../styles/components/faq-container.css'
import '../styles/pages/faq.css'
import HeaderControls from '../components/HeaderControls'
import { FAQItem } from '../components/FAQItem'
import { SolutionSteps } from '../components/SolutionSteps'
import { AlertBox } from '../components/AlertBox'
import PageHeader from '../components/PageHeader'
import { 
  FAQTerminal, 
  FAQTerminalPrompt, 
  FAQTerminalCommand, 
  FAQTerminalOutput, 
  FAQTerminalComment,
  FAQTerminalCursor,
  FAQTerminalMacPrompt,
  FAQTerminalWindowsPrompt
} from '../components/FAQTerminal'

// Dynamic import for heavy component
const FaqClaudeCodePreview = dynamic(() => import('../components/FaqClaudeCodePreview').then(mod => ({ default: mod.FaqClaudeCodePreview })), {
  loading: () => <div className="repl-loading">Claude Code 미리보기 로딩 중...</div>,
  ssr: false
})

// 중앙화된 데이터 import 제거 - 컴포넌트에 직접 작성
import type { FAQTopic } from '@/app/types/faq'

export default function FAQPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL에서 OS 읽기 (Guide 페이지와 동일한 패턴)
  const currentOS = (searchParams.get('os') || 'mac') as 'mac' | 'windows';
  
  // OS 전환 핸들러 (Guide 페이지와 동일한 패턴)
  const handleOSChange = (newOS: 'mac' | 'windows') => {
    router.push(`/faq?os=${newOS}`);
  };


  return (
    <div className="page-wrapper page-wrapper--faq">
      <div className="container">
        {/* 헤더 */}
        <PageHeader
          variant="hero"
          title="Claude Code 도움말"
          subtitle={currentOS === 'windows' ? "명령 프롬프트가 처음이신가요? 걱정 마세요!" : "터미널이 처음이신가요? 걱정 마세요!"}
          badge="FAQ & 문제해결"
        >
          <HeaderControls 
            currentOS={currentOS} 
            onOSChange={handleOSChange}
          />
        </PageHeader>
        
        <main className="main-content faq-content">
          <div className="faq-intro">
            <h2 className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
              터미널이 처음이신가요? 걱정 마세요!
            </h2>
            <h2 className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
              명령 프롬프트가 처음이신가요? 걱정 마세요!
            </h2>
            <p>Claude Code를 설치하며 겪을 수 있는 모든 어려움을 함께 해결해드립니다</p>
          </div>

          {/* FAQ Categories - 항상 모든 섹션 표시 */}
          <section
            className="faq-section is-expanded"
            data-topic="urgent"
          >
            <div className="faq-header">
              <div className="faq-header-left">
                <div className="faq-icon"><i className="fas fa-exclamation-triangle"></i></div>
                <h2>지금 막혔어요!</h2>
              </div>
              <span className="faq-tag urgent">
                <i className="fas fa-bolt"></i> 즉시 해결
              </span>
            </div>
            
            <div className="faq-content-section">
              <UrgentFAQContent currentOS={currentOS} />
            </div>
          </section>

          <section
            className="faq-section is-expanded"
            data-topic="normal"
          >
            <div className="faq-header">
              <div className="faq-header-left">
                <div className="faq-icon"><i className="fas fa-question-circle"></i></div>
                <h2>이게 정상인가요?</h2>
              </div>
              <span className="faq-tag comfort">
                <i className="fas fa-heart"></i> 불안감 해소
              </span>
            </div>
            
            <div className="faq-content-section">
              <NormalFAQContent currentOS={currentOS} />
            </div>
          </section>

          <section
            className="faq-section is-expanded"
            data-topic="basics"
          >
            <div className="faq-header">
              <div className="faq-header-left">
                <div className="faq-icon"><i className="fas fa-book"></i></div>
                <h2>시작 전 알아두기</h2>
              </div>
              <span className="faq-tag knowledge">
                <i className="fas fa-graduation-cap"></i> 기초 지식
              </span>
            </div>
            
            <div className="faq-content-section">
              <BasicsFAQContent currentOS={currentOS} />
            </div>
          </section>

          {/* Return to Guide Button */}
          <ReturnToGuide />
        </main>
      </div>
    </div>
  )
}

// 긴급 FAQ 콘텐츠
function UrgentFAQContent({ currentOS }: { currentOS: 'mac' | 'windows' }) {
  return (
    <>
      {/* Mac FAQ Items */}
      <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
        <FAQItem title="터미널이 어디 있나요? 찾을 수가 없어요!">
          <p>Mac에서 터미널을 찾는 가장 쉬운 방법을 알려드릴게요:</p>
          <SolutionSteps>
            <li><kbd>Command (Cmd) ⌘</kbd> + <kbd>Space</kbd> 를 누르세요 (Spotlight 검색)</li>
            <li>"터미널" 또는 "Terminal"이라고 입력하세요</li>
            <li><kbd className="enter-key">Enter</kbd> 를 누르면 터미널이 열려요!</li>
          </SolutionSteps>
          
          <FAQTerminal title="터미널을 열면 이렇게 보입니다">
            <FAQTerminalOutput>Last login: Mon Jan 8 10:32:15 on ttys001</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalMacPrompt /> <FAQTerminalCursor />
          </FAQTerminal>
          
          <AlertBox variant="info" title="Tip">
            <p>자주 사용하실 거라면 터미널을 Dock에 추가해두세요. 터미널 아이콘을 우클릭하고 "옵션 &gt; Dock에 유지"를 선택하면 됩니다.</p>
          </AlertBox>
        </FAQItem>

        <FAQItem title="비밀번호를 입력해도 아무것도 안 보여요!">
          <p>이건 정상이에요! 터미널은 보안상 비밀번호를 입력할 때 아무것도 표시하지 않습니다.</p>
          <FAQTerminal title="비밀번호 입력 시 화면 - 정상적인 상황">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>sudo npm install -g claude</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>Password:</FAQTerminalOutput> <FAQTerminalCursor />
            {'\n'}
            <FAQTerminalComment># ← 비밀번호를 입력해도 화면에 아무것도 표시되지 않습니다 (보안상 정상)</FAQTerminalComment>
          </FAQTerminal>
          <SolutionSteps>
            <li>그냥 Mac 로그인 비밀번호를 입력하세요</li>
            <li>화면에 아무것도 안 보여도 입력은 되고 있어요</li>
            <li>다 입력했으면 <kbd className="enter-key">Enter</kbd> 를 누르세요</li>
          </SolutionSteps>
          <div className="common-issue">
            비밀번호가 틀렸다고 나오면 다시 천천히 입력해보세요. Caps Lock이 켜져있는지도 확인하세요!
          </div>
      </FAQItem>

      <FAQItem title="Permission denied 오류가 계속 나와요">
        <p>권한 문제예요. Mac에서는 시스템 폴더에 뭔가를 설치할 때 관리자 권한이 필요해요.</p>
        <FAQTerminal title="잘못된 방법 - 권한 오류 발생">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>npm install -g claude</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/claude'</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>npm ERR! The operation was rejected by your operating system.</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>npm ERR! It is likely you do not have the permissions to access this file as the current user</FAQTerminalOutput>
          </FAQTerminal>
          <FAQTerminal title="올바른 방법 - sudo 사용">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>sudo npm install -g claude</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>Password:</FAQTerminalOutput> <FAQTerminalCursor />
            {'\n'}
            <FAQTerminalComment># ← 여기서 Mac 비밀번호를 입력하면 설치가 진행됩니다</FAQTerminalComment>
          </FAQTerminal>
          <p><code>sudo</code>를 앞에 붙이면 관리자 권한으로 실행됩니다.</p>
        </FAQItem>
      </div>

      {/* Windows FAQ Items */}
      <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
        <FAQItem title="명령 프롬프트가 어디 있나요?">
          <p>Windows에서 명령 프롬프트를 여는 가장 쉬운 방법들:</p>
          <SolutionSteps>
            <li><strong>방법 1:</strong> <kbd>Windows (Win) ⊞</kbd> + <kbd>R</kbd> 을 누르고 "cmd" 입력 후 <kbd className="enter-key">Enter</kbd></li>
            <li><strong>방법 2:</strong> 시작 버튼 클릭 → "cmd" 또는 "명령 프롬프트" 검색</li>
            <li><strong>방법 3:</strong> <kbd>Windows (Win) ⊞</kbd> + <kbd>X</kbd> 누르고 "명령 프롬프트" 선택</li>
          </SolutionSteps>
          
          <FAQTerminal title="명령 프롬프트를 열면 이렇게 보입니다" os="windows">
            <FAQTerminalOutput>Microsoft Windows [Version 10.0.22631.4169]</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>(c) Microsoft Corporation. All rights reserved.</FAQTerminalOutput>
            {'\n\n'}
            <FAQTerminalWindowsPrompt /> <FAQTerminalCursor />
          </FAQTerminal>
          
          <AlertBox variant="info" title="팁">
            <p>명령 프롬프트를 자주 사용하신다면 작업 표시줄에 고정해두면 편해요.</p>
          </AlertBox>
        </FAQItem>

        <FAQItem title="액세스가 거부되었습니다 오류가 나와요">
          <p>Windows에서는 관리자 권한으로 명령 프롬프트를 실행해야 할 때가 있어요.</p>
          <SolutionSteps>
            <li>명령 프롬프트를 마우스 우클릭</li>
            <li>"관리자 권한으로 실행" 선택</li>
            <li>사용자 계정 컨트롤 창이 뜨면 "예" 클릭</li>
            <li>다시 명령어를 입력해보세요</li>
          </SolutionSteps>
        </FAQItem>
      </div>
    </>
  )
}

// 정상 상황 FAQ 콘텐츠
function NormalFAQContent({ currentOS }: { currentOS: 'mac' | 'windows' }) {
  return (
    <>
      <FAQItem title="설치가 너무 오래 걸려요 (5분 넘게 진행 중)">
        <p>프로그램 설치는 여러 파일을 다운로드하고 설정하는 과정이라 시간이 걸려요. 특히 처음 설치할 때는 더 그래요.</p>
        <FAQTerminal title="설치 진행 중 화면 - 시간이 오래 걸리는 상황" os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalMacPrompt /> <FAQTerminalCommand>sudo npm install -g @anthropic-ai/claude-code</FAQTerminalCommand>
            {'\n'}
            <FAQTerminalOutput>Password:</FAQTerminalOutput> <FAQTerminalComment># ← 비밀번호 입력 후</FAQTerminalComment>
            {'\n\n'}
            <FAQTerminalOutput>npm WARN deprecated har-validator@5.1.5: this library is no longer supported</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>npm WARN deprecated uuid@3.4.0: Please upgrade to version 7 or higher.</FAQTerminalOutput>
            {'\n\n'}
            <FAQTerminalOutput><span className="loading-spinner"></span> Installing: express@4.18.2</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput><span className="loading-spinner"></span> Installing: lodash@4.17.21</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput><span className="loading-spinner"></span> Installing: moment@2.29.4</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># ← 이런 식으로 여러 프로그램을 차례대로 설치하고 있어요!</FAQTerminalComment>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>npm install -g @anthropic-ai/claude-code</FAQTerminalCommand>
            {'\n'}
            <FAQTerminalOutput>npm WARN deprecated har-validator@5.1.5: this library is no longer supported</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>npm WARN deprecated uuid@3.4.0: Please upgrade to version 7 or higher.</FAQTerminalOutput>
            {'\n\n'}
            <FAQTerminalOutput>[░░░░░░░░░░░░░░░░░░░░] | idealTree:claude-code: timing idealTree:node_modules/.staging</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># ← 프로그레스 바가 천천히 진행됩니다</FAQTerminalComment>
            {'\n\n'}
            <FAQTerminalOutput>[████░░░░░░░░░░░░░░░░] \ fetchMetadata: sill resolveWithNewModule express@4.18.2</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>[████████░░░░░░░░░░░░] | fetchMetadata: timing metavuln:calculate:security-advisory</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>[████████████░░░░░░░░] / extract:lodash: verb lock using C:\Users\username\AppData\Roaming\npm</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># ← 각 패키지를 다운로드하고 설치하는 중입니다</FAQTerminalComment>
          </div>
        </FAQTerminal>
        <AlertBox variant="success" title="정상이에요!">
          <p>인터넷 속도에 따라 5-10분 정도 걸릴 수 있어요. 커피 한 잔 하고 오세요!</p>
        </AlertBox>
      </FAQItem>

      <FAQItem title="설치 중에 WARN 메시지가 여러 개 나왔어요">
        <p>npm은 설치 중에 다양한 경고를 보여주지만, 대부분은 무시해도 됩니다.</p>
        <FAQTerminal title="설치 중 경고 메시지 - 정상적인 상황" os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalMacPrompt /> <FAQTerminalCommand>npm install some-package</FAQTerminalCommand>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>npm install some-package</FAQTerminalCommand>
            </div>
            <FAQTerminalComment># → 명령 프롬프트(cmd) 기준입니다</FAQTerminalComment>
          </div>
          {'\n'}
          <FAQTerminalOutput>npm WARN deprecated package@1.0.0: This package is deprecated</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → 구버전 패키지라는 경고 (정상)</FAQTerminalComment>
          {'\n'}
          <FAQTerminalOutput>npm WARN optional SKIPPING OPTIONAL DEPENDENCY</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → 선택적 구성요소 건너뜀 (정상)</FAQTerminalComment>
          {'\n'}
          <FAQTerminalOutput>npm WARN some-module@2.1.0 requires a peer dependency</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → 추가 패키지가 필요하다는 알림 (정상)</FAQTerminalComment>
        </FAQTerminal>
        <AlertBox variant="info" title="알아두세요">
          <p>WARN은 경고일 뿐이에요. ERROR가 아니라면 정상적으로 설치되고 있는 겁니다!</p>
        </AlertBox>
      </FAQItem>

      <FAQItem title={currentOS === 'windows' ? "명령 프롬프트에 이상한 기호나 색깔이 나와요" : "터미널에 이상한 기호나 색깔이 나와요"}>
        <p>{currentOS === 'windows' ? '명령 프롬프트는' : '터미널은'} 다양한 색상과 기호로 정보를 구분해서 보여줍니다.</p>
        <FAQTerminal title={currentOS === 'windows' ? "명령 프롬프트 색상과 기호 예시" : "터미널 색상과 기호 예시"} os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalMacPrompt /> <FAQTerminalCommand>npm install express</FAQTerminalCommand>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>npm install express</FAQTerminalCommand>
          </div>
          {'\n'}
          <FAQTerminalOutput>added 64 packages in 3s</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → 기본 색상 = 성공/완료</FAQTerminalComment>
          {'\n\n'}
          <FAQTerminalOutput><span className="warn">npm WARN deprecated package@1.0.0: This package is deprecated</span></FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → 노란색 WARN = 경고 (무시 가능)</FAQTerminalComment>
          {'\n\n'}
          <FAQTerminalOutput><span className="error">npm ERR! code ENOENT{'\n'}npm ERR! syscall open</span></FAQTerminalOutput>
          {'\n'}
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalOutput><span className="error">npm ERR! path /Users/username/package.json</span></FAQTerminalOutput>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <FAQTerminalOutput><span className="error">npm ERR! path C:\Users\사용자명\package.json</span></FAQTerminalOutput>
          </div>
          {'\n'}
          <FAQTerminalComment># → 빨간색 ERR! = 오류 (확인 필요)</FAQTerminalComment>
          {'\n\n'}
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <div><FAQTerminalMacPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment># → % 또는 $ = 명령어 입력 대기 중</FAQTerminalComment>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment># → &gt; = 명령어 입력 대기 중</FAQTerminalComment>
          </div>
        </FAQTerminal>
      </FAQItem>
    </>
  )
}

// 기초 지식 FAQ 콘텐츠
function BasicsFAQContent({ currentOS }: { currentOS: 'mac' | 'windows' }) {
  return (
    <>
      <FAQItem title="복사/붙여넣기는 어떻게 하나요?">
        <p>{currentOS === 'windows' ? '명령 프롬프트에서는' : '터미널에서는'} 복사/붙여넣기 방법이 조금 달라요:</p>
        <SolutionSteps type="unordered">
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <li>복사: 텍스트 선택 후 <kbd>Command (Cmd) ⌘</kbd> + <kbd>C</kbd></li>
            <li>붙여넣기: <kbd>Command (Cmd) ⌘</kbd> + <kbd>V</kbd></li>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <li>복사: 텍스트 선택 후 <kbd>Control (Ctrl)</kbd> + <kbd>C</kbd> 또는 마우스 우클릭</li>
            <li>붙여넣기: <kbd>Control (Ctrl)</kbd> + <kbd>V</kbd> 또는 마우스 우클릭</li>
          </div>
        </SolutionSteps>
      </FAQItem>

      <FAQItem title={currentOS === 'windows' ? "명령 프롬프트에서 실수로 이상한 걸 쳤어요" : "터미널에서 실수로 이상한 걸 쳤어요"}>
        <p>괜찮아요! {currentOS === 'windows' ? '명령 프롬프트에서' : '터미널에서'} 빠져나오는 방법들:</p>
        <SolutionSteps type="unordered">
          <li><kbd>Control (Ctrl)</kbd> + <kbd>C</kbd> : 현재 실행 중인 것을 중단</li>
          <li><kbd>Control (Ctrl)</kbd> + <kbd>D</kbd> : 프로그램 종료</li>
          <li><code>exit</code> 입력 : {currentOS === 'windows' ? '명령 프롬프트' : '터미널'} 종료</li>
          <li>최후의 수단: {currentOS === 'windows' ? '명령 프롬프트' : '터미널'} 창을 그냥 닫고 새로 열기</li>
        </SolutionSteps>
        <FaqClaudeCodePreview currentOS={currentOS} />
        
        <FAQTerminal title={currentOS === 'windows' ? "명령 프롬프트 완전히 종료하기" : "터미널 완전히 종료하기"} os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>exit</FAQTerminalCommand>
            </div>
            {'\n'}
            <FAQTerminalOutput>[Process completed]</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → 터미널 창이 닫히거나, 설정에 따라 이 메시지만 남을 수 있습니다</FAQTerminalComment>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>exit</FAQTerminalCommand>
            </div>
            <FAQTerminalComment># → 명령 프롬프트 창이 닫힙니다</FAQTerminalComment>
          </div>
        </FAQTerminal>
      </FAQItem>

      <FAQItem title="cd, ls 같은 명령어는 뭔가요?">
        <p>{currentOS === 'windows' ? '명령 프롬프트에서' : '터미널에서'} 자주 쓰는 기본 명령어들이에요:</p>
        
        {/* pwd/cd - 현재 위치 확인하기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title="pwd - 현재 위치 확인하기">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>pwd</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>/Users/yourname</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → 지금 /Users/yourname 폴더에 있다는 뜻이에요</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title="cd - 현재 위치 확인하기" os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>cd</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>C:\Users\사용자명</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → 지금 C:\Users\사용자명 폴더에 있다는 뜻이에요</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* ls/dir - 파일과 폴더 목록 보기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title="ls - 파일과 폴더 목록 보기">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>ls</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>Desktop    Documents    Downloads    Pictures</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → 현재 폴더에 있는 파일과 폴더들이 보여요</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title="dir - 파일과 폴더 목록 보기" os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>2025-07-16  오전 10:30    &lt;DIR&gt;          .</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-16  오전 10:30    &lt;DIR&gt;          ..</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-16  오전 09:15    &lt;DIR&gt;          Desktop</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-15  오후 02:30    &lt;DIR&gt;          Documents</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-14  오후 05:45    &lt;DIR&gt;          Downloads</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-13  오전 11:20    &lt;DIR&gt;          Pictures</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → 현재 폴더에 있는 파일과 폴더들이 보여요</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* cd - 다른 폴더로 이동하기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title="cd - 다른 폴더로 이동하기">
            <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>cd Desktop</FAQTerminalCommand></div>
            <div><FAQTerminalPrompt>사용자명@MacBook-Pro Desktop %</FAQTerminalPrompt> <FAQTerminalCursor /></div>
            <FAQTerminalComment># → Desktop 폴더로 이동했어요! (프롬프트가 바뀐 걸 보세요)</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title="cd - 다른 폴더로 이동하기" os="windows">
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>cd Desktop</FAQTerminalCommand></div>
            <div><FAQTerminalPrompt>C:\Users\사용자명\Desktop&gt;</FAQTerminalPrompt> <FAQTerminalCursor /></div>
            <FAQTerminalComment># → Desktop 폴더로 이동했어요! (프롬프트가 바뀐 걸 보세요)</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* cd .. - 상위 폴더로 돌아가기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title="cd .. - 상위 폴더로 돌아가기">
            <div><FAQTerminalPrompt>사용자명@MacBook-Pro Desktop %</FAQTerminalPrompt> <FAQTerminalCommand>cd ..</FAQTerminalCommand></div>
            <div><FAQTerminalMacPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment># → Desktop에서 홈 폴더로 돌아왔어요</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title="cd .. - 상위 폴더로 돌아가기" os="windows">
            <div><FAQTerminalPrompt>C:\Users\사용자명\Desktop&gt;</FAQTerminalPrompt> <FAQTerminalCommand>cd ..</FAQTerminalCommand></div>
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment># → Desktop에서 사용자 폴더로 돌아왔어요</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* mkdir - 새 폴더 만들기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title="mkdir - 새 폴더 만들기">
            <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>mkdir my-project</FAQTerminalCommand></div>
            <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>ls</FAQTerminalCommand></div>
            <FAQTerminalOutput>Desktop    Documents    Downloads    Pictures    my-project</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → my-project 폴더가 새로 만들어졌어요!</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title="mkdir - 새 폴더 만들기" os="windows">
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>mkdir my-project</FAQTerminalCommand></div>
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir</FAQTerminalCommand></div>
            <FAQTerminalOutput>2025-07-16  오전 10:35    &lt;DIR&gt;          my-project</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-16  오전 10:30    &lt;DIR&gt;          Desktop</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-15  오후 02:30    &lt;DIR&gt;          Documents</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment># → my-project 폴더가 새로 만들어졌어요!</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* clear/cls - 화면 정리하기 */}
        <FAQTerminal title="clear - 화면 정리하기" className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>clear</FAQTerminalCommand></div>
          <FAQTerminalComment># → 터미널 화면이 깨끗해져요! (이전 내용은 스크롤로 볼 수 있어요)</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title="cls - 화면 정리하기" className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>cls</FAQTerminalCommand></div>
          <FAQTerminalComment># → 명령 프롬프트 화면이 깨끗해져요!</FAQTerminalComment>
        </FAQTerminal>
        
        {/* cat/type - 파일 내용 보기 */}
        <FAQTerminal title="cat - 파일 내용 보기" className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>cat package.json</FAQTerminalCommand></div>
          <FAQTerminalOutput>{`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My first project"
}`}</FAQTerminalOutput>
          <FAQTerminalComment># → 파일의 전체 내용이 보여요</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title="type - 파일 내용 보기" className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>type package.json</FAQTerminalCommand></div>
          <FAQTerminalOutput>{`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My first project"
}`}</FAQTerminalOutput>
          <FAQTerminalComment># → 파일의 전체 내용이 보여요</FAQTerminalComment>
        </FAQTerminal>
        
        {/* which/where - 프로그램 설치 위치 확인 */}
        <FAQTerminal title="which - 프로그램 설치 위치 확인" className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>which node</FAQTerminalCommand></div>
          <FAQTerminalOutput>/usr/local/bin/node</FAQTerminalOutput>
          {'\n'}
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>which npm</FAQTerminalCommand></div>
          <FAQTerminalOutput>/usr/local/bin/npm</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → Node.js와 npm이 제대로 설치되어 있네요!</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title="where - 프로그램 설치 위치 확인" className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>where node</FAQTerminalCommand></div>
          <FAQTerminalOutput>C:\Program Files\nodejs\node.exe</FAQTerminalOutput>
          {'\n'}
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>where npm</FAQTerminalCommand></div>
          <FAQTerminalOutput>C:\Program Files\nodejs\npm.cmd</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → Node.js와 npm이 제대로 설치되어 있네요!</FAQTerminalComment>
        </FAQTerminal>
        
        {/* cp/copy - 파일 복사하기 */}
        <FAQTerminal title="cp - 파일 복사하기" className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>cp README.md README-backup.md</FAQTerminalCommand></div>
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>ls *.md</FAQTerminalCommand></div>
          <FAQTerminalOutput>README-backup.md    README.md</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → README.md 파일의 복사본이 만들어졌어요</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title="copy - 파일 복사하기" className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>copy README.md README-backup.md</FAQTerminalCommand></div>
          <FAQTerminalOutput>        1개 파일이 복사되었습니다.</FAQTerminalOutput>
          {'\n'}
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir *.md</FAQTerminalCommand></div>
          <FAQTerminalOutput>2025-07-16  오전 10:40         1,245 README-backup.md</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalOutput>2025-07-16  오전 10:30         1,245 README.md</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → README.md 파일의 복사본이 만들어졌어요</FAQTerminalComment>
        </FAQTerminal>
        
        {/* mv/move/ren - 파일 이동하거나 이름 바꾸기 */}
        <FAQTerminal title="mv - 파일 이동하거나 이름 바꾸기" className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>mv old-name.txt new-name.txt</FAQTerminalCommand></div>
          <FAQTerminalComment># → 파일 이름이 바뀌었어요</FAQTerminalComment>
          {'\n\n'}
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>mv file.txt Desktop/</FAQTerminalCommand></div>
          <FAQTerminalComment># → file.txt가 Desktop 폴더로 이동했어요</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title="move 또는 ren - 파일 이동하거나 이름 바꾸기" className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>ren old-name.txt new-name.txt</FAQTerminalCommand></div>
          <FAQTerminalComment># → 파일 이름이 바뀌었어요</FAQTerminalComment>
          {'\n\n'}
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>move file.txt Desktop</FAQTerminalCommand></div>
          <FAQTerminalOutput>        1개 파일을 이동했습니다.</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → file.txt가 Desktop 폴더로 이동했어요</FAQTerminalComment>
        </FAQTerminal>
        
        {/* touch/echo > - 빈 파일 만들기 */}
        <FAQTerminal title="touch - 빈 파일 만들기" className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>touch index.js</FAQTerminalCommand></div>
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>ls *.js</FAQTerminalCommand></div>
          <FAQTerminalOutput>index.js</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → 빈 index.js 파일이 만들어졌어요</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title="echo > - 빈 파일 만들기" className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>echo. &gt; index.js</FAQTerminalCommand></div>
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir *.js</FAQTerminalCommand></div>
          <FAQTerminalOutput>2025-07-16  오전 10:45             2 index.js</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment># → index.js 파일이 만들어졌어요</FAQTerminalComment>
        </FAQTerminal>
      </FAQItem>

      <FAQItem title="API Key가 뭐고 어디서 받나요?">
        <p>API Key는 Claude가 당신을 인식하는 비밀번호 같은 거예요.</p>
        <SolutionSteps>
          <li><a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a> 접속</li>
          <li>회원가입 또는 로그인</li>
          <li>"API Keys" 메뉴 클릭</li>
          <li>"Create Key" 버튼 클릭</li>
          <li>생성된 키를 안전한 곳에 복사해두세요</li>
        </SolutionSteps>
        <AlertBox variant="warning" title="중요">
          <p>API Key는 한 번만 보여줘요! 꼭 안전한 곳에 저장해두세요.</p>
        </AlertBox>
      </FAQItem>
    </>
  )
}