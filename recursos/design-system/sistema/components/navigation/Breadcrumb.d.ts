export interface CrumbItem { label: string; href?: string; }
export interface BreadcrumbProps {
  items: (string | CrumbItem)[];
}
