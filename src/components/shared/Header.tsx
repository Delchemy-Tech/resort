import { Section } from '@/lib/supabase';
import HeaderServer from './HeaderServer';

interface HeaderProps {
  headerData: Section | null;
}

const Header: React.FC<HeaderProps> = ({ headerData }) => {
  return <HeaderServer data={headerData} />;
};

export default Header;