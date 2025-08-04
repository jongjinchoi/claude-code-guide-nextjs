'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import ReturnToGuide from '@/app/components/ReturnToGuide'
import '../../styles/components/faq-container.css'
import '../../styles/pages/faq.css'
import HeaderControls from '../../components/HeaderControls'
import { FAQItem } from '../../components/FAQItem'
import { SolutionSteps } from '../../components/SolutionSteps'
import { AlertBox } from '../../components/AlertBox'
import PageHeader from '../../components/PageHeader'
import { 
  FAQTerminal, 
  FAQTerminalPrompt, 
  FAQTerminalCommand, 
  FAQTerminalOutput, 
  FAQTerminalComment,
  FAQTerminalCursor,
  FAQTerminalMacPrompt,
  FAQTerminalWindowsPrompt
} from '../../components/FAQTerminal'

// Dynamic import for heavy component
const FaqClaudeCodePreview = dynamic(() => import('../../components/FaqClaudeCodePreview').then(mod => ({ default: mod.FaqClaudeCodePreview })), {
  loading: function LoadingComponent() {
    const t = useTranslations('faq');
    return <div className="repl-loading">{t('repl.loading')}</div>;
  },
  ssr: false
})

// 중앙화된 데이터 import 제거 - 컴포넌트에 직접 작성
import type { FAQTopic } from '@/app/types/faq'

export default function FAQPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('faq');
  
  // locale 정보 가져오기
  const locale = params?.locale as string || 'en';
  
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
          title={t('header.title')}
          subtitle={t(`header.subtitle.${currentOS}`)}
          badge={t('header.badge')}
        >
          <HeaderControls 
            currentOS={currentOS} 
            onOSChange={handleOSChange}
          />
        </PageHeader>
        
        <main className="main-content faq-content">
          <div className="faq-intro">
            <h2 className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
              {t('intro.title.mac')}
            </h2>
            <h2 className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
              {t('intro.title.windows')}
            </h2>
            <p>{t('intro.description')}</p>
          </div>

          {/* FAQ Categories - 항상 모든 섹션 표시 */}
          <section
            className="faq-section is-expanded"
            data-topic="urgent"
          >
            <div className="faq-header">
              <div className="faq-header-left">
                <div className="faq-icon"><i className={t('section_headers.urgent.icon')}></i></div>
                <h2>{t('section_headers.urgent.title')}</h2>
              </div>
              <span className={`faq-tag ${t('section_headers.urgent.tagClass')}`}>
                <i className={t('section_headers.urgent.tagIcon')}></i> {t('section_headers.urgent.tagText')}
              </span>
            </div>
            
            <div className="faq-content-section">
              <UrgentFAQContent currentOS={currentOS} t={t} />
            </div>
          </section>

          <section
            className="faq-section is-expanded"
            data-topic="normal"
          >
            <div className="faq-header">
              <div className="faq-header-left">
                <div className="faq-icon"><i className={t('section_headers.normal.icon')}></i></div>
                <h2>{t('section_headers.normal.title')}</h2>
              </div>
              <span className={`faq-tag ${t('section_headers.normal.tagClass')}`}>
                <i className={t('section_headers.normal.tagIcon')}></i> {t('section_headers.normal.tagText')}
              </span>
            </div>
            
            <div className="faq-content-section">
              <NormalFAQContent currentOS={currentOS} t={t} />
            </div>
          </section>

          <section
            className="faq-section is-expanded"
            data-topic="basics"
          >
            <div className="faq-header">
              <div className="faq-header-left">
                <div className="faq-icon"><i className={t('section_headers.basics.icon')}></i></div>
                <h2>{t('section_headers.basics.title')}</h2>
              </div>
              <span className={`faq-tag ${t('section_headers.basics.tagClass')}`}>
                <i className={t('section_headers.basics.tagIcon')}></i> {t('section_headers.basics.tagText')}
              </span>
            </div>
            
            <div className="faq-content-section">
              <BasicsFAQContent currentOS={currentOS} t={t} locale={locale} />
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
function UrgentFAQContent({ currentOS, t }: { currentOS: 'mac' | 'windows'; t: any }) {
  return (
    <>
      {/* Mac FAQ Items */}
      <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
        <FAQItem title={t('urgent.mac.terminal_not_found.title')}>
          <p>{t('urgent.mac.terminal_not_found.description')}</p>
          <SolutionSteps>
            <li>{t('urgent.mac.terminal_not_found.steps.0')}</li>
            <li>{t('urgent.mac.terminal_not_found.steps.1')}</li>
            <li>{t('urgent.mac.terminal_not_found.steps.2')}</li>
          </SolutionSteps>
          
          <FAQTerminal title={t('urgent.mac.terminal_not_found.terminal_example.title')}>
            <FAQTerminalOutput>{t('urgent.mac.terminal_not_found.terminal_example.content')}</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalMacPrompt /> <FAQTerminalCursor />
          </FAQTerminal>
          
          <AlertBox variant="info" title={t('alerts.terminal_dock_tip.title')}>
            <p>{t('urgent.mac.terminal_not_found.tip')}</p>
          </AlertBox>
        </FAQItem>

        <FAQItem title={t('urgent.mac.password_invisible.title')}>
          <p>{t('urgent.mac.password_invisible.description')}</p>
          <FAQTerminal title={t('urgent.mac.password_invisible.terminal_example.title')}>
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>sudo npm install -g claude</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>Password:</FAQTerminalOutput> <FAQTerminalCursor />
            {'\n'}
            <FAQTerminalComment>{t('urgent.mac.password_invisible.terminal_example.comment')}</FAQTerminalComment>
          </FAQTerminal>
          <SolutionSteps>
            <li>{t('urgent.mac.password_invisible.steps.0')}</li>
            <li>{t('urgent.mac.password_invisible.steps.1')}</li>
            <li>{t('urgent.mac.password_invisible.steps.2')}</li>
          </SolutionSteps>
          <div className="common-issue">
            {t('urgent.mac.password_invisible.tip')}
          </div>
      </FAQItem>

      <FAQItem title={t('urgent.mac.permission_denied.title')}>
        <p>{t('urgent.mac.permission_denied.description')}</p>
        <FAQTerminal title={t('urgent.mac.permission_denied.wrong_way.title')}>
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>npm install -g claude</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>{t('urgent.mac.permission_denied.wrong_way.errors.0')}</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>{t('urgent.mac.permission_denied.wrong_way.errors.1')}</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>{t('urgent.mac.permission_denied.wrong_way.errors.2')}</FAQTerminalOutput>
          </FAQTerminal>
          <FAQTerminal title={t('urgent.mac.permission_denied.right_way.title')}>
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>sudo npm install -g claude</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>Password:</FAQTerminalOutput> <FAQTerminalCursor />
            {'\n'}
            <FAQTerminalComment>{t('urgent.mac.permission_denied.right_way.comment')}</FAQTerminalComment>
          </FAQTerminal>
          <p>{t('urgent.mac.permission_denied.solution')}</p>
        </FAQItem>
      </div>

      {/* Windows FAQ Items */}
      <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
        <FAQItem title={t('urgent.windows.cmd_not_found.title')}>
          <p>{t('urgent.windows.cmd_not_found.description')}</p>
          <SolutionSteps>
            <li>{t('urgent.windows.cmd_not_found.steps.0')}</li>
            <li>{t('urgent.windows.cmd_not_found.steps.1')}</li>
            <li>{t('urgent.windows.cmd_not_found.steps.2')}</li>
          </SolutionSteps>
          
          <FAQTerminal title={t('urgent.windows.cmd_not_found.terminal_example.title')} os="windows">
            <FAQTerminalOutput>{t('urgent.windows.cmd_not_found.terminal_example.content.0')}</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>{t('urgent.windows.cmd_not_found.terminal_example.content.1')}</FAQTerminalOutput>
            {'\n\n'}
            <FAQTerminalWindowsPrompt /> <FAQTerminalCursor />
          </FAQTerminal>
          
          <AlertBox variant="info" title={t('alerts.cmd_taskbar_tip.title')}>
            <p>{t('urgent.windows.cmd_not_found.tip')}</p>
          </AlertBox>
        </FAQItem>

        <FAQItem title={t('urgent.windows.access_denied.title')}>
          <p>{t('urgent.windows.access_denied.description')}</p>
          <SolutionSteps>
            <li>{t('urgent.windows.access_denied.steps.0')}</li>
            <li>{t('urgent.windows.access_denied.steps.1')}</li>
            <li>{t('urgent.windows.access_denied.steps.2')}</li>
            <li>{t('urgent.windows.access_denied.steps.3')}</li>
          </SolutionSteps>
        </FAQItem>
      </div>
    </>
  )
}

// 정상 상황 FAQ 콘텐츠
function NormalFAQContent({ currentOS, t }: { currentOS: 'mac' | 'windows'; t: any }) {
  return (
    <>
      <FAQItem title={t('normal.installation_slow.title')}>
        <p>{t('normal.installation_slow.description')}</p>
        <FAQTerminal title={t('normal.installation_slow.terminal_example.title')} os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalMacPrompt /> <FAQTerminalCommand>sudo npm install -g @anthropic-ai/claude-code</FAQTerminalCommand>
            {'\n'}
            <FAQTerminalOutput>Password:</FAQTerminalOutput> <FAQTerminalComment>{t('normal.installation_slow.terminal_example.mac.outputs.0')}</FAQTerminalComment>
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
            <FAQTerminalComment>{t('normal.installation_slow.terminal_example.mac.outputs.7')}</FAQTerminalComment>
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
            <FAQTerminalComment>{t('normal.installation_slow.terminal_example.windows.outputs.4')}</FAQTerminalComment>
            {'\n\n'}
            <FAQTerminalOutput>[████░░░░░░░░░░░░░░░░] \ fetchMetadata: sill resolveWithNewModule express@4.18.2</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>[████████░░░░░░░░░░░░] | fetchMetadata: timing metavuln:calculate:security-advisory</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>[████████████░░░░░░░░] / extract:lodash: verb lock using C:\Users\username\AppData\Roaming\npm</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('normal.installation_slow.terminal_example.windows.outputs.9')}</FAQTerminalComment>
          </div>
        </FAQTerminal>
        <AlertBox variant="success" title={t('alerts.installation_time.title')}>
          <p>{t('normal.installation_slow.tip')}</p>
        </AlertBox>
      </FAQItem>

      <FAQItem title={t('normal.warn_messages.title')}>
        <p>{t('normal.warn_messages.description')}</p>
        <FAQTerminal title={t('normal.warn_messages.terminal_example.title')} os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalMacPrompt /> <FAQTerminalCommand>npm install some-package</FAQTerminalCommand>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>npm install some-package</FAQTerminalCommand>
            </div>
            <FAQTerminalComment>{t('normal.warn_messages.terminal_example.windows_note')}</FAQTerminalComment>
          </div>
          {'\n'}
          <FAQTerminalOutput>npm WARN deprecated package@1.0.0: This package is deprecated</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('normal.warn_messages.terminal_example.warnings.0.comment')}</FAQTerminalComment>
          {'\n'}
          <FAQTerminalOutput>npm WARN optional SKIPPING OPTIONAL DEPENDENCY</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('normal.warn_messages.terminal_example.warnings.1.comment')}</FAQTerminalComment>
          {'\n'}
          <FAQTerminalOutput>npm WARN some-module@2.1.0 requires a peer dependency</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('normal.warn_messages.terminal_example.warnings.2.comment')}</FAQTerminalComment>
        </FAQTerminal>
        <AlertBox variant="info" title={t('alerts.warn_vs_error.title')}>
          <p>{t('normal.warn_messages.tip')}</p>
        </AlertBox>
      </FAQItem>

      <FAQItem title={t(`normal.terminal_symbols.title.${currentOS}`)}>
        <p>{t(`normal.terminal_symbols.description.${currentOS}`)}</p>
        <FAQTerminal title={t(`normal.terminal_symbols.terminal_example.title.${currentOS}`)} os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalMacPrompt /> <FAQTerminalCommand>npm install express</FAQTerminalCommand>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>npm install express</FAQTerminalCommand>
          </div>
          {'\n'}
          <FAQTerminalOutput>added 64 packages in 3s</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('normal.terminal_symbols.terminal_example.outputs.0.comment')}</FAQTerminalComment>
          {'\n\n'}
          <FAQTerminalOutput><span className="warn">npm WARN deprecated package@1.0.0: This package is deprecated</span></FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('normal.terminal_symbols.terminal_example.outputs.1.comment')}</FAQTerminalComment>
          {'\n\n'}
          <FAQTerminalOutput><span className="error">npm ERR! code ENOENT{'\n'}npm ERR! syscall open</span></FAQTerminalOutput>
          {'\n'}
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <FAQTerminalOutput><span className="error">npm ERR! path /Users/username/package.json</span></FAQTerminalOutput>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <FAQTerminalOutput><span className="error">npm ERR! path C:\Users\username\package.json</span></FAQTerminalOutput>
          </div>
          {'\n'}
          <FAQTerminalComment>{t('normal.terminal_symbols.terminal_example.outputs.5.comment')}</FAQTerminalComment>
          {'\n\n'}
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <div><FAQTerminalMacPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment>{t('normal.terminal_symbols.terminal_example.prompt_symbols.mac.symbol')} = {t('normal.terminal_symbols.terminal_example.prompt_symbols.mac.meaning')}</FAQTerminalComment>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment>{t('normal.terminal_symbols.terminal_example.prompt_symbols.windows.symbol')} = {t('normal.terminal_symbols.terminal_example.prompt_symbols.windows.meaning')}</FAQTerminalComment>
          </div>
        </FAQTerminal>
      </FAQItem>
    </>
  )
}

// 기초 지식 FAQ 콘텐츠
function BasicsFAQContent({ currentOS, t, locale }: { currentOS: 'mac' | 'windows'; t: any; locale: string }) {
  return (
    <>
      <FAQItem title={t('basics.copy_paste.title')}>
        <p>{t(`basics.copy_paste.description.${currentOS}`)}</p>
        <SolutionSteps type="unordered">
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <li>{t('basics.copy_paste.methods.mac.copy')}</li>
            <li>{t('basics.copy_paste.methods.mac.paste')}</li>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <li>{t('basics.copy_paste.methods.windows.copy')}</li>
            <li>{t('basics.copy_paste.methods.windows.paste')}</li>
          </div>
        </SolutionSteps>
      </FAQItem>

      <FAQItem title={t(`basics.terminal_escape.title.${currentOS}`)}>
        <p>{t(`basics.terminal_escape.description.${currentOS}`)}</p>
        <SolutionSteps type="unordered">
          <li>{t('basics.terminal_escape.solutions.0')}</li>
          <li>{t('basics.terminal_escape.solutions.1')}</li>
          <li>{t('basics.terminal_escape.solutions.2')}</li>
          <li>{t('basics.terminal_escape.solutions.3')}</li>
        </SolutionSteps>
        <FaqClaudeCodePreview currentOS={currentOS} />
        
        <FAQTerminal title={t(`basics.terminal_escape.exit_example.title.${currentOS}`)} os={currentOS}>
          <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>exit</FAQTerminalCommand>
            </div>
            {'\n'}
            <FAQTerminalOutput>[Process completed]</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.terminal_escape.exit_example.comment.mac')}</FAQTerminalComment>
          </div>
          <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>exit</FAQTerminalCommand>
            </div>
            <FAQTerminalComment>{t('basics.terminal_escape.exit_example.result.windows')}</FAQTerminalComment>
          </div>
        </FAQTerminal>
      </FAQItem>

      <FAQItem title={t('basics.basic_commands.title')}>
        <p>{t(`basics.basic_commands.description.${currentOS}`)}</p>
        
        {/* pwd/cd - 현재 위치 확인하기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title={`${t('basics.basic_commands.commands.mac.pwd_name')} - ${t('basics.basic_commands.commands.mac.pwd_desc')}`}>
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>pwd</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>/Users/yourname</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.pwd_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title={`${t('basics.basic_commands.commands.windows.cd_name')} - ${t('basics.basic_commands.commands.windows.cd_desc')}`} os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>cd</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>C:\Users\username</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.basic_commands.commands.windows.cd_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* ls/dir - 파일과 폴더 목록 보기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title={`${t('basics.basic_commands.commands.mac.ls_name')} - ${t('basics.basic_commands.commands.mac.ls_desc')}`}>
            <div>
              <FAQTerminalMacPrompt /> <FAQTerminalCommand>ls</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>Desktop    Documents    Downloads    Pictures</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.ls_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title={`${t('basics.basic_commands.commands.windows.dir_name')} - ${t('basics.basic_commands.commands.windows.dir_desc')}`} os="windows">
            <div>
              <FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir</FAQTerminalCommand>
            </div>
            <FAQTerminalOutput>2025-07-16  10:30 AM    &lt;DIR&gt;          .</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-16  10:30 AM    &lt;DIR&gt;          ..</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-16  09:15 AM    &lt;DIR&gt;          Desktop</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-15  02:30 PM    &lt;DIR&gt;          Documents</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-14  05:45 PM    &lt;DIR&gt;          Downloads</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-13  11:20 AM    &lt;DIR&gt;          Pictures</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.ls_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* cd - 다른 폴더로 이동하기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title={`${t('basics.basic_commands.commands.mac.cd_name')} - ${t('basics.basic_commands.commands.mac.cd_desc')}`}>
            <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>cd Desktop</FAQTerminalCommand></div>
            <div><FAQTerminalPrompt>username@MacBook-Pro Desktop %</FAQTerminalPrompt> <FAQTerminalCursor /></div>
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.cd_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title={`${t('basics.basic_commands.commands.windows.cd_folder_name')} - ${t('basics.basic_commands.commands.windows.cd_folder_desc')}`} os="windows">
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>cd Desktop</FAQTerminalCommand></div>
            <div><FAQTerminalPrompt>C:\Users\username\Desktop&gt;</FAQTerminalPrompt> <FAQTerminalCursor /></div>
            <FAQTerminalComment>{t('basics.basic_commands.commands.windows.cd_folder_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* cd .. - 상위 폴더로 돌아가기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title={`${t('basics.basic_commands.commands.mac.cd_up_name')} - ${t('basics.basic_commands.commands.mac.cd_up_desc')}`}>
            <div><FAQTerminalPrompt>username@MacBook-Pro Desktop %</FAQTerminalPrompt> <FAQTerminalCommand>cd ..</FAQTerminalCommand></div>
            <div><FAQTerminalMacPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.cd_up_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title={`${t('basics.basic_commands.commands.windows.cd_up_name')} - ${t('basics.basic_commands.commands.windows.cd_up_desc')}`} os="windows">
            <div><FAQTerminalPrompt>C:\Users\username\Desktop&gt;</FAQTerminalPrompt> <FAQTerminalCommand>cd ..</FAQTerminalCommand></div>
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCursor /></div>
            <FAQTerminalComment>{t('basics.basic_commands.commands.windows.cd_up_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* mkdir - 새 폴더 만들기 */}
        <div className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <FAQTerminal title={`${t('basics.basic_commands.commands.mac.mkdir_name')} - ${t('basics.basic_commands.commands.mac.mkdir_desc')}`}>
            <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>mkdir my-project</FAQTerminalCommand></div>
            <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>ls</FAQTerminalCommand></div>
            <FAQTerminalOutput>Desktop    Documents    Downloads    Pictures    my-project</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.mkdir_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        <div className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows">
          <FAQTerminal title={`${t('basics.basic_commands.commands.windows.mkdir_name')} - ${t('basics.basic_commands.commands.windows.mkdir_desc')}`} os="windows">
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>mkdir my-project</FAQTerminalCommand></div>
            <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir</FAQTerminalCommand></div>
            <FAQTerminalOutput>2025-07-16  10:35 AM    &lt;DIR&gt;          my-project</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-16  10:30 AM    &lt;DIR&gt;          Desktop</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalOutput>2025-07-15  02:30 PM    &lt;DIR&gt;          Documents</FAQTerminalOutput>
            {'\n'}
            <FAQTerminalComment>{t('basics.basic_commands.commands.mac.mkdir_comment')}</FAQTerminalComment>
          </FAQTerminal>
        </div>
        
        {/* clear/cls - 화면 정리하기 */}
        <FAQTerminal title={`${t('basics.basic_commands.commands.mac.clear_name')} - ${t('basics.basic_commands.commands.mac.clear_desc')}`} className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>clear</FAQTerminalCommand></div>
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.clear_comment')}</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title={`${t('basics.basic_commands.commands.windows.cls_name')} - ${t('basics.basic_commands.commands.windows.cls_desc')}`} className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>cls</FAQTerminalCommand></div>
          <FAQTerminalComment>{t('basics.basic_commands.commands.windows.cls_comment')}</FAQTerminalComment>
        </FAQTerminal>
        
        {/* cat/type - 파일 내용 보기 */}
        <FAQTerminal title={`${t('basics.basic_commands.commands.mac.cat_name')} - ${t('basics.basic_commands.commands.mac.cat_desc')}`} className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>cat package.json</FAQTerminalCommand></div>
          <FAQTerminalOutput>{`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My first project"
}`}</FAQTerminalOutput>
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.cat_comment')}</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title={`${t('basics.basic_commands.commands.windows.type_name')} - ${t('basics.basic_commands.commands.windows.type_desc')}`} className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>type package.json</FAQTerminalCommand></div>
          <FAQTerminalOutput>{`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My first project"
}`}</FAQTerminalOutput>
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.cat_comment')}</FAQTerminalComment>
        </FAQTerminal>
        
        {/* which/where - 프로그램 설치 위치 확인 */}
        <FAQTerminal title={`${t('basics.basic_commands.commands.mac.which_name')} - ${t('basics.basic_commands.commands.mac.which_desc')}`} className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>which node</FAQTerminalCommand></div>
          <FAQTerminalOutput>/usr/local/bin/node</FAQTerminalOutput>
          {'\n'}
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>which npm</FAQTerminalCommand></div>
          <FAQTerminalOutput>/usr/local/bin/npm</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.which_comment')}</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title={`${t('basics.basic_commands.commands.windows.where_name')} - ${t('basics.basic_commands.commands.windows.where_desc')}`} className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>where node</FAQTerminalCommand></div>
          <FAQTerminalOutput>C:\Program Files\nodejs\node.exe</FAQTerminalOutput>
          {'\n'}
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>where npm</FAQTerminalCommand></div>
          <FAQTerminalOutput>C:\Program Files\nodejs\npm.cmd</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.which_comment')}</FAQTerminalComment>
        </FAQTerminal>
        
        {/* cp/copy - 파일 복사하기 */}
        <FAQTerminal title={`${t('basics.basic_commands.commands.mac.cp_name')} - ${t('basics.basic_commands.commands.mac.cp_desc')}`} className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>cp README.md README-backup.md</FAQTerminalCommand></div>
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>ls *.md</FAQTerminalCommand></div>
          <FAQTerminalOutput>README-backup.md    README.md</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.cp_comment')}</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title={`${t('basics.basic_commands.commands.windows.copy_name')} - ${t('basics.basic_commands.commands.windows.copy_desc')}`} className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>copy README.md README-backup.md</FAQTerminalCommand></div>
          <FAQTerminalOutput>        1 file(s) copied.</FAQTerminalOutput>
          {'\n'}
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir *.md</FAQTerminalCommand></div>
          <FAQTerminalOutput>2025-07-16  10:40 AM         1,245 README-backup.md</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalOutput>2025-07-16  10:30 AM         1,245 README.md</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.cp_comment')}</FAQTerminalComment>
        </FAQTerminal>
        
        {/* mv/move/ren - 파일 이동하거나 이름 바꾸기 */}
        <FAQTerminal title={`${t('basics.basic_commands.commands.mac.mv_name')} - ${t('basics.basic_commands.commands.mac.mv_desc')}`} className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>mv old-name.txt new-name.txt</FAQTerminalCommand></div>
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.mv_rename_comment')}</FAQTerminalComment>
          {'\n\n'}
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>mv file.txt Desktop/</FAQTerminalCommand></div>
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.mv_move_comment')}</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title={`${t('basics.basic_commands.commands.windows.move_ren_name')} - ${t('basics.basic_commands.commands.windows.move_ren_desc')}`} className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>ren old-name.txt new-name.txt</FAQTerminalCommand></div>
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.mv_rename_comment')}</FAQTerminalComment>
          {'\n\n'}
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>move file.txt Desktop</FAQTerminalCommand></div>
          <FAQTerminalOutput>        1 file(s) moved.</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.mv_move_comment')}</FAQTerminalComment>
        </FAQTerminal>
        
        {/* touch/echo > - 빈 파일 만들기 */}
        <FAQTerminal title={`${t('basics.basic_commands.commands.mac.touch_name')} - ${t('basics.basic_commands.commands.mac.touch_desc')}`} className={`os-specific ${currentOS === 'mac' ? 'active' : ''}`} data-os="mac">
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>touch index.js</FAQTerminalCommand></div>
          <div><FAQTerminalMacPrompt /> <FAQTerminalCommand>ls *.js</FAQTerminalCommand></div>
          <FAQTerminalOutput>index.js</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.mac.touch_comment')}</FAQTerminalComment>
        </FAQTerminal>
        <FAQTerminal title={`${t('basics.basic_commands.commands.windows.echo_name')} - ${t('basics.basic_commands.commands.windows.echo_desc')}`} className={`os-specific ${currentOS === 'windows' ? 'active' : ''}`} data-os="windows" os="windows">
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>echo. &gt; index.js</FAQTerminalCommand></div>
          <div><FAQTerminalWindowsPrompt /> <FAQTerminalCommand>dir *.js</FAQTerminalCommand></div>
          <FAQTerminalOutput>2025-07-16  10:45 AM             2 index.js</FAQTerminalOutput>
          {'\n'}
          <FAQTerminalComment>{t('basics.basic_commands.commands.windows.echo_comment')}</FAQTerminalComment>
        </FAQTerminal>
      </FAQItem>

      <FAQItem title={t('basics.api_key.title')}>
        <p>{t('basics.api_key.description')}</p>
        <SolutionSteps>
          <li>
            {locale === 'en' ? 'Go to ' : ''}
            <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>
            {locale === 'ko' ? ' 접속' : ''}
          </li>
          <li>{t('basics.api_key.steps.1')}</li>
          <li>{t('basics.api_key.steps.2')}</li>
          <li>{t('basics.api_key.steps.3')}</li>
          <li>{t('basics.api_key.steps.4')}</li>
        </SolutionSteps>
        <AlertBox variant="warning" title={t('alerts.api_key_warning.title')}>
          <p>{t('basics.api_key.warning')}</p>
        </AlertBox>
      </FAQItem>
    </>
  )
}