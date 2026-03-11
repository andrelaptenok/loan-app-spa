import type { PropsWithChildren } from 'react'

interface LoanLayoutProps extends PropsWithChildren {
  title: string
}

export const LoanLayout = ({ children, title }: LoanLayoutProps) => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <h2 className="mb-4">{title}</h2>
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
