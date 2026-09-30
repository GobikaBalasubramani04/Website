export interface NavItem { id: string; label: string; href: string }
export interface Titled { title: string; text: string }
export interface Career extends Titled { quote: string; dark: boolean }
export interface TechGroup { group: string; items: { name: string; text: string }[] }

/** Replace null with real values. Nothing here is invented. */
export const CONFIG: { email: string | null; linkedin: string | null; instagram: string | null; google: string | null } =
  { email: null, linkedin: null, instagram: null, google: null };

export const NAV: NavItem[] = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'culture', label: 'Culture', href: '/culture' }, { id: 'technologies', label: 'Technologies', href: '/technologies' },
  { id: 'industries', label: 'Industries', href: '/industries' }, { id: 'careers', label: 'Careers', href: '/careers' },
  { id: 'contact', label: 'Contact', href: '/contact' }];

export const CULTURE: (Titled & { sub: string })[] = [
  { title: 'Sooner', sub: 'The way we build', text: 'We move from idea to useful outcome efficiently, shipping working systems early and improving them with feedback.' },
  { title: 'Safer', sub: 'The way we work', text: 'We engineer with care. Reliable code, clear communication and responsible collaboration keep people and products safe.' },
  { title: 'Happier', sub: 'The way we grow', text: 'We invest in people through learning, teamwork and room to take on new challenges.' }];

export const TECH: TechGroup[] = [
  { group: 'Interface', items: [
    { name: 'React', text: 'Component-based interfaces that stay fast and consistent as products grow.' },
    { name: 'TypeScript', text: 'Typed code that catches mistakes early and keeps large codebases maintainable.' },
    { name: 'JavaScript', text: 'The language of the web, used across front-end and back-end work.' },
    { name: 'Astro', text: 'Content-focused sites that load quickly with minimal client-side code.' }] },
  { group: 'Logic', items: [
    { name: 'Node.js', text: 'Server-side JavaScript for services and integrations.' },
    { name: 'Python', text: 'Automation, data processing and back-end systems.' },
    { name: 'APIs', text: 'Clean interfaces that connect systems, teams and third-party services.' }] },
  { group: 'Data', items: [
    { name: 'PostgreSQL', text: 'A dependable relational database for structured, business-critical data.' },
    { name: 'Supabase', text: 'A back-end platform for authentication, database and storage.' }] },
  { group: 'Intelligence', items: [{ name: 'AI / ML', text: 'Machine learning and AI features that help systems learn from data.' }] }];

export const INDUSTRIES: Titled[] = [
  { title: 'Retail', text: 'Systems that connect stock, sales and customers.' },
  { title: 'Manufacturing', text: 'Software that brings clarity to production, quality and planning.' },
  { title: 'Logistics', text: 'Tools for tracking movement, routes and deliveries.' },
  { title: 'FinTech', text: 'Secure, reliable systems for financial workflows.' },
  { title: 'HRMS / Human Resources', text: 'People systems for hiring, records and growth.' },
  { title: 'Agriculture', text: 'Technology that supports data-informed farming and supply chains.' },
  { title: 'Healthcare', text: 'Careful, dependable systems for health and care processes.' },
  { title: 'Media', text: 'Platforms for creating, managing and delivering content.' }];

export const CAREERS: Career[] = [
  { title: 'Internship', quote: 'Learn. Build. Grow.', dark: false, text: 'Start your career by working on real projects, learning from experienced engineers and building skills that last.' },
  { title: 'Full Time', quote: 'Build. Grow. Lead.', dark: true, text: 'Join the team to design and ship systems, take ownership of your work and grow into leadership.' }];
