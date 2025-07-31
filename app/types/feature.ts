export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureDetail extends Feature {
  id: string;
  benefits?: string[];
  examples?: string[];
}

// FeatureCard 컴포넌트 타입
export interface FeatureExample {
  label: string;
  content: string;
}

export interface FeatureCardProps {
  variant: 'recommended' | 'advanced';
  icon: string;
  title: string;
  description: string | React.ReactNode;
  badge?: string;
  example?: FeatureExample;
}