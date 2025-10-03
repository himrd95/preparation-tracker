'use client'

import { Suspense, lazy, ComponentType } from 'react'
import { DashboardSkeleton, DSASkeleton, FrontendSkeleton, SystemDesignSkeleton } from '@/components/ui/skeleton'

// Lazy load page components
const DashboardPage = lazy(() => import('@/app/dashboard/page'))
const DSAPage = lazy(() => import('@/app/dsa/page'))
const FrontendPage = lazy(() => import('@/app/frontend/page'))
const SystemDesignPage = lazy(() => import('@/app/system-design/page'))

// Loading wrapper component
function LoadingWrapper({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Lazy loaded page components with their respective skeletons
export function LazyDashboardPage() {
  return (
    <LoadingWrapper fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </LoadingWrapper>
  )
}

export function LazyDSAPage() {
  return (
    <LoadingWrapper fallback={<DSASkeleton />}>
      <DSAPage />
    </LoadingWrapper>
  )
}

export function LazyFrontendPage() {
  return (
    <LoadingWrapper fallback={<FrontendSkeleton />}>
      <FrontendPage />
    </LoadingWrapper>
  )
}

export function LazySystemDesignPage() {
  return (
    <LoadingWrapper fallback={<SystemDesignSkeleton />}>
      <SystemDesignPage />
    </LoadingWrapper>
  )
}
