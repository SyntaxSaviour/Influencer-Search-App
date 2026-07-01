import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
}

export function Layout({
  children,
  title,
  eyebrow,
  description,
  actions,
}: LayoutProps) {
  return (
    <main id="main-content" className="page-shell">
      <div className="page-frame">
        {title && (
          <header className="page-heading">
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h1>{title}</h1>
              {description && <p className="page-description">{description}</p>}
            </div>
            {actions && <div className="page-heading-actions">{actions}</div>}
          </header>
        )}
        {children}
      </div>
    </main>
  );
}
