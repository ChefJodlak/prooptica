export interface BrandCategory {
  id: string
  name: string
}

export interface Brand {
  name: string
  category: string
  description: string
  tier: string
}

export interface TechPartner {
  name: string
  description: string
}

export interface BrandStat {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
}

