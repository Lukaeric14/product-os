import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { FeatureDetail } from '@/pages/FeatureDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/feature/:week/:name',
    element: <FeatureDetail />,
  },
])
